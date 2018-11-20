import React, { Component } from "react";
import axios from 'axios';
import {connect} from "react-redux";

class Highlight extends Component {

    constructor(props){
        super(props);

        this.state = ({
            isLoadding: false,
            error: null,
            highlights : [],
            id: '',
            target : '',
            articlePost : this.props.articlePost,
        })
    }

    componentDidMount(){
        this.setState({ isLoading: true });
        axios.get(process.env.REACT_APP_REST_API_LOCATION+'highlight/?search='+this.props.articleId)
        .then(response => {
            if (response) {
                return response.data;
            } else {
                throw new Error('Algo a ido mal...');
            }
        })
        .then(data => {
            this.setState({ highlights: data, isLoading: false });
            this.printHighlights(data)
        })
        .catch(error => this.setState({ error, isLoading: false }));
    }

    //REMOVE POPOVER
    removePopover = () =>{
        let popover = document.querySelector('.underline-popover');
        popover.setAttribute("style", `display:none;`);
    };

    //UNDERLINE DATA BASE UNDERLINE CONTENT
    printHighlights = (data) =>{
        data.map(highlight => {
            let text = document.querySelector(".text");
            let innerHTML = text.innerHTML;
            let index = innerHTML.indexOf(highlight.highlight_content);
            if (index >= 0) {
                let newNode = document.createElement("span");
                newNode.setAttribute("class", "underline");
                newNode.innerHTML =  innerHTML.substring(index, index + highlight.highlight_content.length);
                innerHTML = innerHTML.substring(0, index) + newNode.outerHTML + innerHTML.substring(index + highlight.highlight_content.length);
                text.innerHTML = innerHTML;
            }
        });
    };

    //SHOW POPOVER IF IS LOGGED
    highlight = ()=>{
        if(this.props.data[0].isLogged){
            let selected = getSelection();
            let range = selected.getRangeAt(0);
            this.searchByContent(selected.toString())
            .then(data =>{
               if(data.length===0){
                   if(this.validHTML(range)){
                       let popover = document.querySelector('.underline-popover');
                       popover.classList.remove("selected");
                       popover.classList.remove("info");
                       let rect = range.getBoundingClientRect();
                       let rectMiddle = (rect.left + rect.right) / 2;
                       popover.setAttribute("style", `display:block;top:${rect.top}px;left:${rectMiddle}px;`);
                   }
               }
            });

            if(selected.toString().length <= 0){
                this.removePopover();
            }
        }
    };

    //GET UNDERLINE SELECTION
    getSelection = () =>{
        let seltxt = '';
        if (window.getSelection) {
            seltxt = window.getSelection();
        } else if (document.getSelection) {
            seltxt = document.getSelection();
        } else if (document.selection) {
            seltxt = document.selection.createRange().text;
        }
        else return;
        return seltxt;
    };

    //PERSIST IN DB SELECTION
    createHighlight = (text) =>{
        axios.post(process.env.REACT_APP_REST_API_LOCATION+'highlight/',
            {
                "article" : this.props.articleId,
                "highlight_content": text
            },
            {
            headers: {
                "Authorization": "Token "+this.props.data[0].token
            },
        })
        .then(res=> {
            console.log(res);
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    //SEARCH BY CONTENT
    searchByContent=(content)=>{
        return axios.get(process.env.REACT_APP_REST_API_LOCATION+'highlight/?highlight_content='+content)
            .then(response => {
                return response.data;
            })
            .then(data => {
                return data;
            })
            .catch(error =>{
                console.log(error)
            });
    };

    //ON HOVER GET THIS UNDERLINE DATA
    highlightInfo= (e) =>{
       let target = e.target;
       if (target.classList.contains('underline')){
           this.searchByContent(target.innerHTML)
           .then(data =>{
               if(data[0].owner === this.props.data[0].username ) {
                   this.setState({id: data[0].id, target: target});
                   let popover = document.querySelector('.underline-popover');
                   popover.classList.add('info');
                   popover.classList.remove("selected");
                   let rect = target.getBoundingClientRect();
                   let rectMiddle = (rect.left + rect.right) / 2;
                   popover.setAttribute("style", `display:block;top:${rect.top}px;left:${rectMiddle}px;`);
               }
           })
       }
    };

    //CHECK IF <P> TAG IS IN MIDDLE
   validHTML = (range) => {
       let document_fragment = range.cloneContents();
       const serializer = new XMLSerializer();
       const document_fragment_string = serializer.serializeToString(document_fragment);
       let openingTags = document_fragment_string.match(/<p (.*?)>(.*?)<\/p>/);

       return openingTags == null;
   };

   //UNDERLINE CONTENT ON CLICK BUTTON
   select= () =>{
       let selected = getSelection();
       try {
           if(selected){
               let range = selected.getRangeAt(0);
               //this.validHTML(range.extractContents());
               if(selected.toString().length > 1 && this.props.data[0].isLogged){
                   let popover = document.querySelector('.underline-popover');
                   popover.classList.add("selected");
                   popover.classList.remove("info");
                   let newNode = document.createElement("span");
                   newNode.onmouseover = this.highlightInfo;
                   newNode.setAttribute("class", "underline");
                   //range.surroundContents(newNode);
                   newNode.appendChild(range.extractContents());
                   range.insertNode(newNode);
                   this.createHighlight(selected.toString())
               }
               selected.removeAllRanges();
           }
       }
       catch(error) {
       }
   };

    //REMOVE UNDERLINE IF IS OWNER
    remove = () =>{
        axios.delete(process.env.REACT_APP_REST_API_LOCATION+'highlight/'+this.state.id,{
            headers: {
                "Authorization": "Token "+this.props.data[0].token,
            }
        })
        .then(response =>{
            console.log(response);
            let text = document.querySelector(".text");
            let innerHTML = text.innerHTML;
            let index = innerHTML.indexOf(this.state.target.innerHTML);
            let popover = document.querySelector('.underline-popover');
            popover.classList.remove("info");
            popover.classList.remove("selected");
            this.removePopover();
            if (index >= 0) {
                innerHTML = innerHTML.substring(0, index - 24) + this.state.target.innerHTML + innerHTML.substring(index + this.state.target.innerHTML.length);
                text.innerHTML = innerHTML;
            }
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

        return (
            <div>
                <div className="underline-popover">
                    <button onClick={this.select} id="button-select">
                        <svg className="svgIcon-use" width="25" height="25">
                            <path d="M13.7 15.964l5.204-9.387-4.726-2.62-5.204 9.387 4.726 2.62zm-.493.885l-1.313 2.37-1.252.54-.702 1.263-3.796-.865 1.228-2.213-.202-1.35 1.314-2.37 4.722 2.616z"></path>
                        </svg>
                    </button>
                    <button onClick={this.remove} id="button-remove">
                        <svg className="svgIcon-use" width="25" height="25">
                            <path d="M13.7 15.964l5.204-9.387-4.726-2.62-5.204 9.387 4.726 2.62zm-.493.885l-1.313 2.37-1.252.54-.702 1.263-3.796-.865 1.228-2.213-.202-1.35 1.314-2.37 4.722 2.616z"></path>
                        </svg>
                    </button>
                    <div className="arrow-clip"><span className="arrow"> </span></div>
                </div>
                <div className="text" onMouseUp={this.highlight} onMouseOver={this.highlightInfo}>
                    {this.state.articlePost}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    data: state.user.data,
});

export default connect(mapStateToProps)(Highlight);
