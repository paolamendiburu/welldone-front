import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Content, Header } from './components';
import ErrorBoundary from '../utils/ErrorBoundary';
import { GetUser} from "./../scenes/Auth/GetUser";
import {userReset} from "../actions";
import {connect} from "react-redux";

class App extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        if(this.props.data[0].username!== ''){
            const token = this.props.data[0].token;
            const username = this.props.data[0].username;
            let user = GetUser(username,token);
            user.then(data =>{
                if(!data[0]){
                    this.props.userReset();
                }
            })
        }
    };

  render() {
    return (
      <Router>
        <ErrorBoundary>
          <Header />
          <Content />
          <ToastContainer />
        </ErrorBoundary>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
    data: state.user.data,
});

const mapDispatchToProps = {
    userReset,
};

export default connect(mapStateToProps,mapDispatchToProps)(App);
