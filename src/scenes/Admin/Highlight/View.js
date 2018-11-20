import React from 'react';
import PropTypes from 'prop-types';
import Article from "./Article";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const View = ({highlights, toggle, modal, className, erase})=>(
    <div>
        {highlights.map(highlight =>
            <div className="highlight" key={highlight.id}>
                <Article slug={highlight.article} content={highlight.highlight_content}/>
                <a onClick={toggle} id={highlight.id} className="delete">Eliminar</a>
            </div>
        )}
        <Modal isOpen={modal} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}>Eliminar subrayado</ModalHeader>
            <ModalBody>
                Vas a eliminar un subrayado
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={erase}>Eliminar</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancelar</Button>
            </ModalFooter>
        </Modal>
    </div>
);

export default View;