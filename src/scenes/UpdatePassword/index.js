import React, { Component } from 'react';

import SubmitForm from "./SubmitForm";
import {toast} from "react-toastify";

import './style.css';
import {translate} from "react-i18next";

class UpdatePassword extends Component {

    constructor(props){
        super(props);

        this.state = this.getInitialState();

        this.formState = {
            validate: false
        };
    }

    componentWillMount(){
        let token=this.props.match.params.token;
        let id=this.props.match.params.id;

        return fetch(process.env.REACT_APP_REST_API_LOCATION+'users/'+id+'/',{
            mode: 'cors',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Token "+token
            }
        })
            .then((response) => response.json())
            .then(responseData =>{
                this.setState({
                    email:{
                        value: responseData.email
                    },
                    username:{
                        value: responseData.username
                    }
                });
            }).catch(err => err);
    }

    inputStatus = (content, validate) =>{
        return {
            content:  content,
            validate: validate
        };
    };

    getInitialState(){
        let password = this.inputStatus(' ',true);
        let password2 = this.inputStatus(' ',true);
        return {password, password2, email: {content: ''},username: {content: ''}};
    }


    handlePasswordChange=(e)=>{
        let target = e.target.value;

        if (target.length <6){
            let password=this.inputStatus(target,false);
            this.setState({password});
        }else{
            let password=this.inputStatus(target,true);
            this.setState({password});
        }
    };

    handlePassword2Change=(e)=>{
        let target = e.target.value;

        if (target!== this.state.password.content){
            let password2=this.inputStatus(target,false);
            this.setState({password2});
        }else{
            let password2=this.inputStatus(target,true);
            this.setState({password2});
        }
    };

    checkValidForm(){
        if( this.state.password.validate === true && this.state.password2.validate === true){
            this.formState.validate = true;
        }else{
            this.formState.validate = false;
        }
    };

    handleSubmit=(e)=>{
        e.preventDefault();
        if(this.state.password.content !== this.state.password2.content){
            let password2=this.inputStatus(this.state.password2.content,false);
            this.setState({password2});
            this.checkValidForm();
        }else{
            let data = { password: this.state.password.content, email: this.state.email.value, username: this.state.username.value};
            return fetch(process.env.REACT_APP_REST_API_LOCATION+'users/'+this.props.match.params.id+'/',{
                mode: 'cors',
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Token "+this.props.match.params.token
                }
            })
                .then((response) => response.json())
                .then(responseData =>{
                    toast.success(this.props.t("Toast.Update ok"), {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                    this.props.history.push('/login');
                }).catch(err => err);
        }
    };

    render() {

        return (
            <div className="container" id="page-update-password">
                <div className="row">
                    <div className="col-sm-12 col-md-8 offset-md-2">
                        <h2>{this.props.t("Update password.Title")}</h2>
                        <p>{this.props.t("Update password.Text")}</p>
                        <SubmitForm handlePasswordChange = {(e)=> this.handlePasswordChange(e)} handlePassword2Change = {(e)=> this.handlePassword2Change(e)} handleSubmit={(e)=> this.handleSubmit(e)} passwordValidate={this.state.password.validate} password2Validate={this.state.password2.validate}  checkValidForm = {this.checkValidForm()} formState = {this.formState.validate} passwordNew ={this.props.t("Form.Password new")}  passwordNewEror ={this.props.t("Form.Password error")} passwordNewRepeat = {this.props.t("Form.Password new repeat")} passwordNewRepeatError = {this.props.t("Form.Password error2")} button = {this.props.t("Form.Update password")} />
                    </div>
                </div>
            </div>
        );
    }
}


export default translate("translations")(UpdatePassword);

