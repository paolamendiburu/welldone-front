import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import mediumDraftExporter from 'medium-draft/lib/exporter';
import { createEditorState } from 'medium-draft';
import FormArticle from './view';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import moment from 'moment';

import 'medium-draft/dist/basic.css';
import 'medium-draft/dist/medium-draft.css';

class WriteArticle extends Component {
  constructor() {
    super();
    this.state = this.getInitialState();
    this.formState = { validate: false };
    this.fullTextHandler = editorState => {
      this.setState({ editorState });
    };

    this.refsEditor = React.createRef();
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    //this.refsEditor.current.focus();
    axios
      .get(process.env.REACT_APP_REST_API_LOCATION + 'categories/')
      .then(response => {
        if (response) {
          return response.data;
        } else {
          throw new Error('Algo a ido mal...');
        }
      })
      .then(data => this.setState({ categories: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  inputStatus = (value, validate) => {
    return {
      value: value,
      validate: validate
    };
  };

  getInitialState() {
    let articleId = '';
    let categories = [];
    let isLoading = false;
    let error = null;
    let selectedFile = null;
    let editorValidate = true;
    let editorState = createEditorState();
    let title = this.inputStatus('', true);
    let introduction = this.inputStatus('', true);
    let category = this.inputStatus([], true);
    let startDate = moment();
    let status = this.inputStatus('PUB', true);
    return {
      articleId,
      categories,
      isLoading,
      error,
      selectedFile,
      editorValidate,
      editorState,
      title,
      introduction,
      category,
      startDate,
      status
    };
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  handleFileChange = event => {
    this.setState({
      selectedFile: event.target.files[0]
    });

    return this.state.selectedFile !== '';
  };

  handleTitleChange = event => {
    let target = event.target.value;
    if (target !== '') {
      let title = this.inputStatus(target, true);
      this.setState({ title });
    } else {
      let title = this.inputStatus(target, false);
      this.setState({ title });
    }
  };

  editorValidate = () => {
    if (
      this.state.editorState.getCurrentContent().getPlainText().length === 0
    ) {
      this.setState({ editorValidate: false });
    } else {
      this.setState({ editorValidate: true });
    }
  };

  checkValidForm() {
    if (
      this.state.title.validate &&
      this.state.introduction.validate &&
      this.state.category.validate &&
      this.state.editorState.getCurrentContent().getPlainText().length > 0
    ) {
      this.formState.validate = true;
    } else {
      this.formState.validate = false;
    }
  }

  handleCategoryChange = event => {
    let target = event.target.value;
    if (target !== '') {
      let category = this.inputStatus(
        [].slice.call(event.target.selectedOptions).map(o => {
          return o.value;
        }),
        true
      );
      this.setState({ category });
    } else {
      let category = this.inputStatus(
        [].slice.call(event.target.selectedOptions).map(o => {
          return o.value;
        }),
        false
      );
      this.setState({ category });
    }
  };

  handleIntroductionChange = event => {
    let target = event.target.value;
    if (target !== '') {
      let introduction = this.inputStatus(target, true);
      this.setState({ introduction });
    } else {
      let introduction = this.inputStatus(target, false);
      this.setState({ introduction });
    }
  };

  handlePublishedChange = event => {
    let target = event.target.value;
    let status = this.inputStatus(target, true);
    this.setState({ status });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.editorValidate();
    const renderedHTML = mediumDraftExporter(
      this.state.editorState.getCurrentContent()
    );

    //create form
    const fd = new FormData();
    fd.append('title', this.state.title.value);
    fd.append('introduction', this.state.introduction.value);
    fd.append('full_text', renderedHTML);
    fd.append('publish_date', this.state.startDate.format('YYYY-MM-DD HH:mm'));
    fd.append('status', this.state.status.value);
    fd.append('category', this.state.category.value);
    if (this.props.articleId !== '') {
      fd.append('answer_article', this.props.articleId);
    }

    //if has image
    if (this.state.selectedFile !== null) {
      if (this.state.selectedFile.type === 'image/jpg' || this.state.selectedFile.type === 'image/png') {
        fd.append(
          'image',
          this.state.selectedFile,
          this.state.selectedFile.name
        );
      }
      if (this.state.selectedFile.type === 'video/mp4') {
        fd.append(
          'media',
          this.state.selectedFile,
          this.state.selectedFile.name
        );
      }
    }

    //if form is validate
    if (
      this.state.title.validate &&
      this.state.introduction.validate &&
      this.state.category.validate &&
      this.state.editorState.getCurrentContent().getPlainText().length > 0
    ) {
      axios
        .post(process.env.REACT_APP_REST_API_LOCATION + 'articles/', fd, {
          headers: {
            Authorization: 'Token ' + this.props.data[0].token
          }
        })
        .then(res => {
          toast.success(this.props.t('Toast.Create article'), {
            position: toast.POSITION.BOTTOM_RIGHT
          });

          //reset form
          this.setState({
            editorState: createEditorState(),
            title: {
              value: '',
              validate: true
            },
            introduction: {
              value: '',
              validate: true
            }
          });
        })
        .catch(error => {
          toast.error(this.props.t('Toast.Create articleError'), {
            position: toast.POSITION.BOTTOM_RIGHT
          });
        });
    }
  };

  render() {
    const { categories, isLoading, error, editorState } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
      <FormArticle
        handleSubmit={this.handleSubmit}
        handleTitleChange={e => this.handleTitleChange(e)}
        titleValue={this.state.title.value}
        titleValidate={this.state.title.validate}
        handleFileChange={e => this.handleFileChange(e)}
        handleIntroductionChange={e => this.handleIntroductionChange(e)}
        introductionValue={this.state.introduction.value}
        introductionValidate={this.state.introduction.validate}
        refsEditor={this.refsEditor}
        editorState={editorState}
        fullTextHandler={this.fullTextHandler}
        editorValidate={this.state.editorValidate}
        handleCategoryChange={e => this.handleCategoryChange(e)}
        categoryValidate={this.state.category.validate}
        categories={categories}
        checkValidForm={this.checkValidForm()}
        formState={this.formState.validate}
        title={this.props.t('Create article.Title')}
        formTitle={this.props.t('Form.Title')}
        formTitleError={this.props.t('Form.Title error')}
        handleChange={this.handleChange}
        startDate={this.state.startDate}
        handlePublishedChange={e => this.handlePublishedChange(e)}
      />
    );
  }
}

const mapStateToProps = state => ({
  data: state.user.data
});

export default translate('translations')(
  connect(mapStateToProps)(WriteArticle)
);
