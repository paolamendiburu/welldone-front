import React, { Component } from 'react';

import {getUser} from './../../utils/functions';
import SubmitForm from "./SubmitForm";
import {toast} from "react-toastify";

import './style.css';
import {translate} from "react-i18next";

class RecoverPassword extends Component {

    constructor(props){
        super(props);

        this.state = this.getInitialState();

        this.formState = {
            validate: false
        };
    }

    componentWillMount() {
        /*if ( this.props.match.params.token) {
            //this.props.history.replace('/change-password');
        }*/
    }

    inputStatus = (content, validate) =>{
        return {
            content:  content,
            validate: validate
        };
    };

    getInitialState(){
        let email = this.inputStatus(' ',true);
        return {email};
    }


    getUser(info){
        return getUser(info);
    };

    checkEmail = (value, target) =>{

        if (value !== undefined){
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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


    handleEmailChange=(e)=>{
        let target = e.target.value;
        let email=this.getUser(target);

        email.then(info =>{
            this.checkEmail(info, target);
        });
    };

    checkValidForm(){
        if ( this.state.email.validate === true){
            this.formState.validate = true;
        }else{
            this.formState.validate = false;
        }
    };

    handleSubmit=(e)=>{
        e.preventDefault();
        let data = { email: this.state.email.content};
        return fetch(process.env.REACT_APP_REST_API_LOCATION+'recover-password',{
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((response) => response.json())
        .then(responseData =>{
            this.setState(this.getInitialState());
            toast.success(this.props.t("Toast.Send ok"), {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }).catch(err => err);
    };

    render() {

        return (
            <div className="container" id="page-recover-password">
                <div className="row">
                    <div className="col-sm-12 col-md-8 offset-md-2">
                        <h2>{this.props.t("Recover password.Title")}</h2>
                        <p>{this.props.t("Recover password.Text")}</p>
                        <SubmitForm handleEmailChange = {(e)=> this.handleEmailChange(e)} handleSubmit={(e)=> this.handleSubmit(e)} emailValidate={this.state.email.validate}  checkValidForm = {this.checkValidForm()} formState = {this.formState.validate} email = {this.props.t("Form.Email")} emailError = {this.props.t("Form.Email not found")} button = {this.props.t("Form.Recover password") }/>
                    </div>
                </div>
            </div>
        );
    }
}


export default translate("translations")(RecoverPassword);

