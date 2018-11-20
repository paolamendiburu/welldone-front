import React, { Component } from 'react';
import {WriteArticle} from './../../../App/components';
import {translate} from "react-i18next";

class NewArticle extends Component {

    constructor(props) {
        super(props);
    }


    render() {

        return (
            <WriteArticle articleId = ''/>
        )
    }
};

export default  translate("translations")(NewArticle);