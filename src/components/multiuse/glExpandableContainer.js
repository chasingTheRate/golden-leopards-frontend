import React from "react";
import {
  Accordion,
  useAccordionButton,
  Card,
} from 'react-bootstrap';
import _ from 'lodash';

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey);
  return (
    <div
      onClick={decoratedOnClick}
    >
      {children}
    </div>
  );
}

const GLExpandableContainer = ({ eventKey = 1, header, accordion }) => {
  return (
    <Accordion>
      <Card style={{ border: 'none', backgroundColor: 'transparent'}}>
        <Card.Header style={{padding: 0, backgroundColor: 'transparent', margin: 0, border: 'none'}}>
          <div>
            <CustomToggle eventKey={ eventKey }>
              { header }
            </CustomToggle>
          </div>
        </Card.Header>
        <Accordion.Collapse eventKey={ eventKey }>
          <Card.Body style={{padding: 0}}>
            { accordion }
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

export default GLExpandableContainer;
