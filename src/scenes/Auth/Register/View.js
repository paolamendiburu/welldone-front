import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Form, Button, Label, Input, FormFeedback } from 'reactstrap';


const FormRegister = ({
      handleSubmit,
      handleUserChange,
      handleEmailChange,
      handlePasswordChange,
      userValidate,
      emailValidate,
      passwordValidate,
      checkValidForm,
      formState,
      username,
      usernameError,
      password,
      passwordPlaceholder,
      passwordError,
      email,
      emailError,
      button
})=>(
    <div>
        <Form className="form-horizontal" onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="user">{username} </Label>
                <Input  type="text"
                       id="user"
                       required="required"
                       onChange={handleUserChange}
                        onKeyPress={checkValidForm}
                       className={userValidate ? 'valid' : 'is-invalid'}
                       placeholder={username}
                        pattern="^\S+$"/>
                <FormFeedback tooltip>{usernameError}</FormFeedback>
            </FormGroup>
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
            <FormGroup>
                <Label for="password">{password}</Label>
                <Input  type="password"
                        id="password"
                        required="required"
                        onKeyPress={checkValidForm}
                        onChange={handlePasswordChange}
                        className={passwordValidate ? 'valid' : 'is-invalid'}
                        placeholder={passwordPlaceholder}/>
                <FormFeedback tooltip>{passwordError}</FormFeedback>
            </FormGroup>

            <Button type="submit" color="primary" disabled={!formState}>{button}</Button>
        </Form>
    </div>
);


FormRegister.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleUserChange: PropTypes.func.isRequired,
    handleEmailChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    userValidate: PropTypes.bool.isRequired,
    emailValidate: PropTypes.bool.isRequired,
    passwordValidate: PropTypes.bool.isRequired,
    checkValidForm: PropTypes.bool,
    formState: PropTypes.bool.isRequired,
};

export default FormRegister;