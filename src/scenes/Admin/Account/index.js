import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Redirect } from 'react-router';
import FormRegister from './view';
import { userReset, userSaveData } from '../../../actions';
import {toast} from "react-toastify";
import {translate} from "react-i18next";

class Account extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
        this.eraseUser = this.eraseUser.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }


    eraseUser(){
        return fetch(process.env.REACT_APP_REST_API_LOCATION+'users/'+this.props.data[0].id,{
            mode: 'cors',
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                "Authorization": "Token "+this.props.data[0].token
            }
        })
        .then(res => {
            return res;})
        .then(res =>{
            this.setState({ modal: !this.state.modal });
            this.props.userReset();
            toast.error(this.props.t("Admin account.Delete user"), {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            this.setState({ redirect: true });
            })
        .catch(err => err);
    }

    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to='/register'/>;
        }

        return (
            <FormRegister text = {'Ajustes de cuenta'}
                button = {this.props.t("Admin account.Delete account")}
                toggle = {this.toggle}
                modalState = {this.state.modal}
                modalTitle = {this.props.t("Admin account.Modal title")}
                modalBody = {this.props.t("Admin account.Modal body")}
                eraseUser = {this.eraseUser}
                username = {this.props.data[0].username}
            />
        )
    }
};

const mapStateToProps = state => ({
    data: state.user.data,
});

const mapDispatchToProps = {
    userReset,
    userSaveData,
};

export default  translate("translations")(connect(mapStateToProps, mapDispatchToProps)(Account));