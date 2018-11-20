import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import axios from "axios/index";
import {connect} from "react-redux";
import View from "./View";

class Highlight extends Component {

    constructor(props) {
        super(props);

        this.state = ({
            isLoadding: false,
            error: null,
            highlights : [],
            modal: false,
            id: ''

        });

        this.toggle = this.toggle.bind(this);
        this.eraseHighlight= this.eraseHighlight.bind(this);
    }

    componentDidMount(){
        this.setState({ isLoading: true });
        axios.get(process.env.REACT_APP_REST_API_LOCATION+'highlight/?owner__username='+this.props.data[0].username)
            .then(response => {
                if (response) {
                    return response.data;
                } else {
                    throw new Error('Algo a ido mal...');
                }
            })
            .then(data => {
                this.setState({ highlights: data, isLoading: false });
            })
            .catch(error => this.setState({ error, isLoading: false }));
    };

    toggle(event) {
        this.setState({
            modal: !this.state.modal,
            id: event.target.id
        });
    }

    removeHighlight = (idData) =>{
        const newState = this.state;
        const index = newState.highlights.findIndex(a => a.id === parseInt(idData) );

        if (index === -1) return;
        newState.highlights.splice(index, 1);

        this.setState(newState);
    };

    eraseHighlight = () =>{
        const id = this.state.id;
        axios.delete(process.env.REACT_APP_REST_API_LOCATION+'highlight/'+id,{
            headers: {
                "Authorization": "Token "+this.props.data[0].token,
            }
        })
        .then(response =>{
            this.removeHighlight(id);
            console.log(response);
            this.setState({ modal: !this.state.modal });

        })
        .catch(function (error) {
            console.log(error);
        });

    };


    render() {
        const { isLoading, error } = this.state;

        if (error) {
            return <p>{error.message}</p>;
        }

        if (isLoading) {
            return <p>Loading ...</p>;
        }

        if(this.state.highlights.length === 0){
            return <p>No hay contenido subrayado</p>;
        }


        return (
           <View highlights = {this.state.highlights} toggle ={this.toggle} modal = {this.state.modal} className={this.props.className} erase = {this.eraseHighlight}/>
        )
    }
};

const mapStateToProps = state => ({
    data: state.user.data,
});

export default  connect(mapStateToProps)(Highlight);