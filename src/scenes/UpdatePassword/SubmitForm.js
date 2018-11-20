import React from 'react';
import { FormGroup, Form, Button, Label, Input, FormFeedback } from 'reactstrap';


const SubmitForm = ({handlePasswordChange, handlePassword2Change, handleSubmit, passwordValidate, password2Validate, checkValidForm, formState, passwordNew, passwordNewError, passwordNewRepeat, PasswordNewRepeatError, button})=>(
    <div>
        <Form className="form-horizontal" onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="password">{passwordNew}</Label>
                <Input  type="password"
                        id="password"
                        required="required"
                        onKeyPress={checkValidForm}
                        onChange={handlePasswordChange}
                        className={passwordValidate ? 'valid' : 'is-invalid'}
                        placeholder={passwordNewError}/>
                <FormFeedback tooltip>{passwordNewError}</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="password2">{passwordNewRepeat}</Label>
                <Input  type="password"
                        id="password2"
                        required="required"
                        onKeyPress={checkValidForm}
                        onChange={handlePassword2Change}
                        className={password2Validate ? 'valid' : 'is-invalid'}
                        placeholder={passwordNewRepeat}/>
                <FormFeedback tooltip>{PasswordNewRepeatError}s</FormFeedback>
            </FormGroup>

            <Button type="submit" color="primary" disabled={!formState}>{button}</Button>
        </Form>
    </div>
);

export default SubmitForm;