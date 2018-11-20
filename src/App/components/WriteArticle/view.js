import React from 'react';
import PropTypes from 'prop-types';
import { Editor} from "medium-draft";
import { FormGroup, Form, Button, Label, Input, FormFeedback, FormText, Col } from 'reactstrap';
import {translate} from "react-i18next";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

const FormArticle = ({
                         handleSubmit,
                         handleTitleChange,
                         titleValue,
                         titleValidate,
                         handleFileChange,
                         handleIntroductionChange,
                         introductionValue,
                         introductionValidate,
                         refsEditor,
                         editorState,
                         fullTextHandler,
                         editorValidate,
                         handleCategoryChange,
                         categoryValidate,
                         categories,
                         checkValidForm,
                         formState,
                         title,
                         formTitle,
                         formTitleError,
                         handleChange,
                        startDate,
                        handlePublishedChange,

                      })=>(
    <div>
        <Form className="form-horizontal write-article-form" onSubmit={handleSubmit}>
            <h1>{title}</h1>
            <FormGroup>
                <Label for="título">{formTitle} </Label>
                <Input  type="text"
                        id="title"
                        required="required"
                        onChange = {handleTitleChange}
                        onKeyPress={checkValidForm}
                        className={titleValidate ? 'valid' : 'is-invalid'}
                        value = {titleValue}/>
                <FormFeedback tooltip>{formTitleError}</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="exampleFile">Imagen</Label>
                <Input type="file"
                       name="file"
                       id="exampleFile"
                       onChange = {handleFileChange} />
                <FormText color="muted">
                    Sube una imagen o un video
                </FormText>
            </FormGroup>
            <FormGroup>
                <Label for="introduction">Introducción</Label>
                <Input type="textarea"
                       name="introduction"
                       id="introduction"
                       value = {introductionValue}
                       onKeyPress={checkValidForm}
                       className={introductionValidate ? 'valid' : 'is-invalid'}
                       onChange = {handleIntroductionChange} />
                <FormFeedback tooltip>Escribe una introducción</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="text">Tu historia</Label>
                <div className={editorValidate ? 'editor-content valid' : 'editor-content is-invalid'} >
                    <Editor
                        ref={refsEditor}
                        editorState={editorState}
                        onKeyPress={checkValidForm}
                        placeholder="Escribe tu historia..."
                        required="required"
                        onChange={fullTextHandler} />
                    <FormFeedback tooltip>Escribe una historia</FormFeedback>
                </div>
            </FormGroup>
            <FormGroup>
                <Label for="category">Select Multiple</Label>
                <Input type="select"
                       name="category"
                       id="category"
                       required="required"
                       onKeyPress={checkValidForm}
                       multiple
                       className={categoryValidate ? 'valid' : 'is-invalid'}
                       onChange = {handleCategoryChange}>
                    {categories.map(category =>
                        <option key={category.id} value={category.id}>{category.name}</option>
                    )}
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="category">Fecha de publicación</Label>
                <DatePicker
                    selected={startDate}
                    onChange={handleChange}
                    minDate={moment()}
                    maxDate={moment().add(5, "months")}
                    dateFormat="DD/MM/YYYY"
                    showDisabledMonthNavigation />
            </FormGroup>

            <FormGroup tag="fieldset" row>
                <legend className="col-form-label col-sm-2">Publicado</legend>
                <Col sm={10}>
                    <FormGroup check>
                        <Label   onClick={handlePublishedChange}>
                            <Input type="radio" name="radio" defaultChecked  value = 'PUB'  onChange={handlePublishedChange} />{' '}
                            Si
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input type="radio" name="radio" value = 'DRA' onChange={handlePublishedChange} />{' '}
                            No
                        </Label>
                    </FormGroup>
                </Col>
            </FormGroup>
            <Button type="submit" color="primary"  disabled={!formState}>Enviar</Button>

        </Form>
    </div>
);

FormArticle.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleTitleChange: PropTypes.func.isRequired,
    handleIntroductionChange: PropTypes.func.isRequired,
    handleFileChange: PropTypes.func.isRequired,
    handleCategoryChange: PropTypes.func.isRequired,
    titleValidate: PropTypes.bool.isRequired,
    introductionValidate: PropTypes.bool.isRequired,
    editorValidate: PropTypes.bool.isRequired,
    categoryValidate: PropTypes.bool.isRequired,
    checkValidForm: PropTypes.bool,
    categories: PropTypes.array.isRequired,
    formState: PropTypes.bool.isRequired,
};

export default  translate("translations")(FormArticle);