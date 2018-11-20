import React from 'react';
import { Route } from 'react-router-dom';
import { Register } from '../../../scenes';
import { Login } from '../../../scenes';

const ContentAuth = () => (
    <div id="page-auth">
        <img src="/images/bg-auth.jpg" alt="" className="bg-image"/>
        <Route exact path="/register" component={Register} activeClassName="active" />
        <Route exact path="/login" component={Login}  activeClassName="active"/>
    </div>
);

export default ContentAuth;