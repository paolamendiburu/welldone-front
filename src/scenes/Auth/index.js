import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import { ContentAuth } from './../../App/components'

import './style.css';
import {translate} from "react-i18next";

class Auth extends Component {

    render() {
        return(

            <div>
                <div className="auth-nav">
                    <NavLink to='/register'>{this.props.t("Register.Register")}</NavLink>
                    <NavLink to="/login">{this.props.t("Register.Login")}</NavLink>
                </div>
                <ContentAuth/>
            </div>
        )
    }
}

export default translate("translations")(Auth);
