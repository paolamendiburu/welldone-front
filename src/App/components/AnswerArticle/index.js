import React, {Component} from 'react';
import { connect } from 'react-redux';
import  WriteArticle from './../WriteArticle';
import {userReset, userSaveData} from "../../../actions";

class AnswerArticle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpened: false,
            isLogged: this.props.data[0].isLogged,
        };

        this.toggleBox = this.toggleBox.bind(this);
    }
    toggleBox() {
        const {isOpened} = this.state;
        this.setState({
            isOpened: !isOpened,
        })
    }

    render() {

        const { isOpened, isLogged } = this.state;

        if (!isOpened && isLogged) {
            return <button onClick={this.toggleBox} className="answer-article__button">Contestar con un artículo</button>
        }

        if(!isLogged){
            return(
                <p>Inicia sesión para contestar con un artículo</p>
            )
        }

        if(isOpened){
            return <WriteArticle articleId=''/>
        }
    }
};


const mapStateToProps = state => ({
    data: state.user.data,
});

const mapDispatchToProps = {
    userReset,
    userSaveData,
};

export default connect(mapStateToProps,mapDispatchToProps)(AnswerArticle);
