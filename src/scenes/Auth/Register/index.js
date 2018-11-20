import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormUser from './View';
import { Redirect } from 'react-router';

import { CreateUser } from "./CreateUser";
import { GetToken } from "./../GetToken";
import { userSaveData } from '../../../actions';
import {toast} from "react-toastify";
import {translate, Trans} from "react-i18next";

class Register extends Component {

    constructor(props){
        super(props);
        this.state = this.getInitialState();
        this.formState = {
            validate: false
        };
    }

    inputStatus = (content, validate) =>{
        return {
            content:  content,
            validate: validate
        };
    };

    getInitialState(){
        let user = this.inputStatus(' ',true);
        let email = this.inputStatus(' ',true);
        let password = this.inputStatus('',true);
        return {
            user,
            email,
            password
        }
    };

    checkValidForm(){
        if ( this.state.user.validate === true && this.state.email.validate === true && this.state.password.validate === true){
            this.formState.validate = true;
        }else{
            this.formState.validate = false;
        }
    };

    getUser = (info) =>{
        return fetch(process.env.REACT_APP_REST_API_LOCATION+'users/?search='+info)
            .then(resolve => {
                return resolve.json();
            }).then(data =>{
                return Object.keys(data)[0];
            }).catch(error => console.log('Error ' + error));
    };

    checkUser = (value, target) =>{
        if (value === undefined){
            if (target.length === 0 || target.split(' ').length > 1){
                let user = this.inputStatus(target,false);
                this.setState({user});
            }else{
                let user=this.inputStatus(target,true);
                this.setState({user});
            }
        }else{
            let user=this.inputStatus(target,false);
            this.setState({user});
        }
    };

    checkEmail = (value, target) =>{

        if (value === undefined){
            let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if(re.test(target) && target!==0){
                let email=this.inputStatus(target,true);
                this.setState({email});
            }else{
                let email=this.inputStatus(target,false);
                this.setState({email});
            }
        }else{
            let email=this.inputStatus(target,false);
            this.setState({email});
        }
    };

    handleUserChange = (e) => {
        let target = e.target.value;
        let username=this.getUser(target);

        username.then(info =>{
            this.checkUser(info, target);
        });
    };

    handleEmailChange = (e) => {
        let target = e.target.value;
        let email=this.getUser(target);

        email.then(info =>{
            this.checkEmail(info, target);
        });
    };

    handlePasswordChange = (e) => {
        let target = e.target.value;
        if(target.length>=6){
            let password = this.inputStatus(target,true);
            this.setState({password});
        }else{
            let password = this.inputStatus(target,false);
            this.setState({password});
        }
    };

    handleSubmit = (e) =>{
        e.preventDefault();
        if(this.state.user.validate === true && this.state.email.validate === true && this.state.password.validate === true){
            let data = { username: this.state.user.content, email: this.state.email.content,password: this.state.password.content};
            let user =CreateUser(data);
            user.then(datainfo =>{
                let token =GetToken(data);
                token.then(datatoken =>{
                    this.props.userSaveData({username: datainfo.username, id: datainfo.id, token: datatoken.token, isLogged: true});
                    toast.success(this.props.t("Toast.Create user"), {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                    this.props.history.push('/admin/account');
                    //this.setState({ redirect: true });
                    this.setState(this.getInitialState());
                });
            }).then();
        }
    };

    render() {

        return (

            <div className="form-content">
                <img src="/images/logo.svg" alt=""/>
                <h2> {this.props.t("Register.Title")}</h2>

                <FormUser
                    handleSubmit = {this.handleSubmit}
                    handleUserChange ={(e)=> this.handleUserChange(e)}
                    handleEmailChange ={(e)=> this.handleEmailChange(e)}
                    handlePasswordChange ={(e)=> this.handlePasswordChange(e)}
                    userValidate = {this.state.user.validate}
                    emailValidate = {this.state.email.validate}
                    passwordValidate = {this.state.password.validate}
                    checkValidForm = {this.checkValidForm()}
                    formState = {this.formState.validate}
                    username = {this.props.t("Form.Username")}
                    usernameError = {this.props.t("Form.Username error")}
                    password = {this.props.t("Form.Password")}
                    passwordPlaceholder = {this.props.t("Form.Password placeholder")}
                    passwordError = {this.props.t("Form.Password error")}
                    email = {this.props.t("Form.Email")}
                    emailError = {this.props.t("Form.Email error")}
                    button = {this.props.t("Form.Create account")}
                />
                <p>
                    <Trans i18nKey='Register.BackLink'>
                    No quiero crear una cuenta, <a href="/">sólo explorar los artículos.</a>
                    </Trans>
                </p>
            </div>

        );
    }
}


const mapStateToProps = state => ({
    data: state.user.data,
});

const mapDispatchToProps = {
    userSaveData,
};

export default  translate("translations")(connect(mapStateToProps, mapDispatchToProps)(Register));

