import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Button,
  Modal,
  Form,
  Spinner,
  FloatingLabel
} from 'react-bootstrap';


const EditGameModal = ({ modalRef, show, onHide, onShow, selectedGame }) => {
  
  const [game, setGame] = useState({});
  
  React.useEffect(() => {
    setGame(selectedGame);
  }, [selectedGame])

  
  return (
      <Modal
        show={ show }
        onShow= { onShow }
        onHide= { onHide }
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton closeVariant='white'>
          <Modal.Title>Edit Game</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div ref={ modalRef }>
              <FloatingLabel
                controlId="opponent"
                label="Opponent"
                className="mb-3"
              >
                <Form.Control placeholder={ game.opponent } />
              </FloatingLabel>
              <FloatingLabel
                controlId="field"
                label="Field"
                className="mb-3"
              >
                <Form.Control placeholder='test' />
              </FloatingLabel>
            </div>
            {/* {isLoading 
              ? <div className='tournament-modal-loading-container' style={{ height: `${modalBodyHeight}px` }}>
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              : <div ref={ref} key={`default-checkbox`} style={{color: 'rgb(100, 100, 100)'}}>
              {roster.map(r => (
                <Form.Check
                  key={`roster-checkbox-${r.id}`} 
                  type={'checkbox'}
                  id={`default-checkbox-${r.id}`}
                  label={ r.displayname }
                  inline
                  checked={ selectedTournament.player_ids ? selectedTournament.player_ids.includes(r.id) : false }
                  onChange={ (e) => handleCheckboxChange(e, r) }
                  style={{width: '85px'}}
                />
              ))}
            </div>} */}
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ onHide }>
            Close
          </Button>
          <Button variant="primary">OK</Button>
        </Modal.Footer>
      </Modal>
  );
}

export default EditGameModal;
