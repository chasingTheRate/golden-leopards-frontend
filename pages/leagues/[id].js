import React, { useState, useEffect, useRef } from "react";


import {
  Container,
  Button,
  Badge,
  Accordion,
  useAccordionButton,
  Card
} from 'react-bootstrap';
import _ from 'lodash';


// export async function getServerSideProps() {
//   //const ssLeagues = await getLeagues();
//   return {props: {  }};
// }

const GLLeague = ({ ssLeagues = [], ssRoster = [] }) => {

  const [leagues, setLeagues] = useState(ssLeagues);
  const [showCreateLeagueModal, setShowCreateLeagueModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  
  const modalRef = useRef(null);

  return (
    <Container fluid style={{
      height: '100%',
      backgroundColor: 'white'
    }}>
      LEAGUE HERE
    </Container>
  );
}

export default GLLeague;
