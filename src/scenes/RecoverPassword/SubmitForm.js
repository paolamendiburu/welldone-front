import React from 'react';
import { FormGroup, Form, Button, Label, Input, FormFeedback } from 'reactstrap';


const SubmitForm = ({handleEmailChange, handleSubmit, emailValidate, checkValidForm, formState, email, emailError, button})=>(
    <div>
        <Form className="form-horizontal" onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="email">{email}</Label>
                <Input  type="email"
                        id="email"
                        required="required"
                        onKeyPress={checkValidForm}
                        onChange={handleEmailChange}
                        className={emailValidate ? 'valid' : 'is-invalid'}
                        placeholder={email}/>
                <FormFeedback tooltip>{emailError}</FormFeedback>
            </FormGroup>

            <Button type="submit" color="primary" disabled={!formState}>{button}</Button>
        </Form>
    </div>
);

export default SubmitForm;