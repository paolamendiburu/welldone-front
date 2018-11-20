import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const FormRegister = ({text, button, toggle, modalState, modalTitle, modalBody, eraseUser, username})=>(
    <div>
        <h1>{text} {username}</h1>
        <Button color="danger" onClick={toggle}>{button}</Button>

        <Modal isOpen={modalState} toggle={toggle} className=''>
            <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
            <ModalBody>
                {modalBody}
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={eraseUser}>Eliminar</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancelar</Button>
            </ModalFooter>
        </Modal>
    </div>
);


FormRegister.propTypes = {
    text: PropTypes.string.isRequired,
    button: PropTypes.string.isRequired,
    toggle: PropTypes.func.isRequired,
    modalState: PropTypes.bool.isRequired,
    modalTitle: PropTypes.string.isRequired,
    modalBody: PropTypes.string.isRequired,
    eraseUser: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
};

export default FormRegister;