

import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Form,
  Spinner
} from 'react-bootstrap';

const AddRemovePlayerModal = ({
  modalRef,
  show,
  isLoading,
  game,
  roster,
  onHide,
  onSubmit,
  onExit,
  handleClose,
  handleAddRemovePlayer,
  onShow,
  modalBodyHeight
}) => {
  


  return (
    <Modal
      show={show}
      onShow={ onShow }
      onExited={handleClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton closeVariant='white'>
        <Modal.Title>Add/Remove Interested Player(s)</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          { isLoading 
            ? <div className='tournament-modal-loading-container' style={{ height: `${modalBodyHeight}px` }}>
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            : <div ref={modalRef} key={`default-checkbox`} style={{color: 'rgb(100, 100, 100)'}}>
                {roster.map(r => (
                  <Form.Check
                    key={`roster-checkbox-${r.id}`} 
                    type={'checkbox'}
                    id={`default-checkbox-${r.id}`}
                    label={ r.displayname }
                    inline
                    checked={ game.player_ids ? game.player_ids.includes(r.id) : false }
                    onChange={ (e) => handleAddRemovePlayer(e, r) }
                    style={{width: '85px'}}
                  />
                ))}
              </div>  }
          
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={ onSubmit }>OK</Button>
      </Modal.Footer>
    </Modal> 
  );
}

export default AddRemovePlayerModal;





