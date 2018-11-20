import React, { Component } from 'react';
import { GetToken } from "./../GetToken";
import { GetUser} from "./../GetUser";
import { FormGroup, Form, Button, Label, Input, FormFeedback } from 'reactstrap';
import {userSaveData} from "../../../actions";
import {connect} from "react-redux";
import {translate} from "react-i18next";
import {toast} from "react-toastify";

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
          username: '',
          password: ''
        };
        this.formState= false
    }

    checkValidForm = (e) =>{
        if (this.state.username.length>0 && this.state.password.length>0){
            this.formState = true;
        }else{
            this.formState = false;
        }
    };

    handleUserChange = (e) => {
        let target = e.target.value;
        this.setState({username: target});
    };

    handlePasswordChange = (e) => {
        let target = e.target.value;
        this.setState({password: target});
    };

    handleSubmit = (e) =>{
        e.preventDefault();
        let data = { username: this.state.username,password: this.state.password};
        let token =GetToken(data);
        token.then(data =>{
            if(data.token === undefined){
                toast.error('Usuario o contraseña no válido', {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                this.setState({
                    password:'',
                })
            }else{
                let user = GetUser(this.state.username, data.token);
                let token = data.token;
                user.then(data =>{
                    this.props.userSaveData({username: data[0].username, id: data[0].id, token: token, isLogged: true});
                    this.props.history.push('/admin/account');
                })
            }
        });
    };


    render() {
        return (

            <div className="form-content">
                <img src="/images/logo.svg" alt=""/>
                <h2> {this.props.t("Login.Title")}</h2>
                <div>
                    <Form className="form-horizontal" onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="username">{this.props.t("Form.Username")}</Label>
                            <Input  type="text"
                                    id="username"
                                    required="required"
                                    placeholder={this.props.t("Form.Username")}
                                    onChange={this.handleUserChange}
                                    onKeyPress={this.checkValidForm}
                                    value={this.state.username}
                                   />
                            <FormFeedback tooltip>{this.props.t("Form.Username error")}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">{this.props.t("Form.Password")}</Label>
                            <Input  type="password"
                                    id="password"
                                    required="required"
                                    onChange={this.handlePasswordChange}
                                    onKeyPress={this.checkValidForm}
                                    value={this.state.password}
                                   />
                            <FormFeedback tooltip>{this.props.t("Form.Password error")}</FormFeedback>
                        </FormGroup>

                        <Button type="submit" color="primary" disabled={!this.formState}>{this.props.t("Form.Login")}</Button>
                    </Form>
                </div>
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

export default translate("translations")(connect(mapStateToProps,mapDispatchToProps)(Login));