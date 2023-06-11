import React from "react";
import {
  Accordion,
  useAccordionButton,
  Card,
  Button
} from 'react-bootstrap';
import _ from 'lodash';



const TournamentListItemAccordian = ({record, onEdit}) => {
  return (
    <div>
      <div className="sli-action-button-container">
          <Button
            size="sm"
            onClick= { (e) => onEdit(record) }
          ><i className="bi bi-pencil"></i></Button>
        </div>
    </div>
  );
}

export default TournamentListItemAccordian;
