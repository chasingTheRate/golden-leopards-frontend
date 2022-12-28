import React, { useState, useEffect, useRef } from "react";
import { 
  getLeagues,
  createLeague
} from '../src/api/goldenLeopardsApi';
import {
  Container,
  Button,
  Badge,
  Accordion,
  useAccordionButton,
  Card
} from 'react-bootstrap';
import _ from 'lodash';

import CreateLeagueModal from "../src/components/modals/createLeagueModal";

import { defaultLeague } from "../src/components/leagues/leagueProperties";

export async function getServerSideProps() {
  const ssLeagues = await getLeagues();
  return {props: { ssLeagues }};
}

const typeBadges = {
  season: (<Badge bg="secondary">SEASON</Badge>),
  tournament: (<Badge bg="warning">TOURNAMENT</Badge>),
  friendly: (<Badge bg="info">FRIENDLY</Badge>)
}

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

const GLLeagues = ({ ssLeagues = [], ssRoster = [] }) => {

  const [leagues, setLeagues] = useState(ssLeagues);
  const [showCreateLeagueModal, setShowCreateLeagueModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const modalRef = useRef(null);

  const handleCreateLeague = () => {
    setShowCreateLeagueModal(true);
  }

  const handleCloseCreateLeagueModal = () => {
    setShowCreateLeagueModal(false);
  }

  const handleOnExit = () => {
    setIsLoading(false);
  }

  const handleOnCreateLeagueSubmit = async (league) => {
    try {
      setIsLoading(true);
      await createLeague(league);
      await refreshLeagues();
    } catch (e) {
      console.error(e);
    }
    handleCloseCreateLeagueModal();
  }

  const refreshLeagues = async () => {
    const leagues = await getLeagues();
    setLeagues(leagues)
  }

  return (
    <Container fluid style={{
      height: '100%',
      backgroundColor: 'white'
    }}>
      <Container style={{
        padding: '40px 12px 0 12px'
      }}>
        {
          leagues.map(l => {
            const eventKey = l.displayname;
            return (
              <Accordion>
                <Card style={{border: 0 }}>
                  <Card.Header style={{ padding: 0, border: 0 }}>
                    <div style={{
                      backgroundColor: 'white'
                    }}>
                      <CustomToggle eventKey={ eventKey }>
                      <div>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <span style={{ fontSize: 'x-small'}}>
                            { typeBadges[l.type] }
                          </span>
                          <span style={{
                            marginLeft: '5px',
                            color: 'rgb(75, 75, 75)',
                            fontWeight: '500',
                            fontSize: '0.9em',
                            lineHeight: '1.1em',
                            textAlign: 'center',
                            flexGrow: 1,
                          }}>{ l.displayname }</span>
                        </div>
                      </div>
                      </CustomToggle>
                    </div>
                  </Card.Header>
                  <Accordion.Collapse eventKey={ eventKey }>
                    <Card.Body style={{
                      padding: '12px 0 0 0'
                    }}>
                      {/* <div>
                        <Button
                          style={{
                            color: '#15469d',
                            borderColor: '#15469d',
                            backgroundColor: 'white'
                          }}
                          size="sm"
                        ><i className="bi bi-pencil"></i></Button>
                      </div> */}
                    </Card.Body>
                  </Accordion.Collapse>
                  <hr style={{flexGrow: 1}}></hr>
                </Card>
              </Accordion>
            )
          })
        }
      </Container>
      <div style={{
        display: 'flex',
        flexDirection: 'row-reverse',
        padding: '0 12px 0 12px'
      }}>
        <Button
          variant="outline-primary"
          size="sm"
          onClick={ () => handleCreateLeague()}
        >
          <i className="bi bi-plus-lg"></i>
        </Button>
      </div>
      <CreateLeagueModal
        modalRef= { modalRef }
        show={ showCreateLeagueModal }
        onHide={ handleCloseCreateLeagueModal }
        onExit={ handleOnExit }
        backdrop="static"
        keyboard={false}
        centered
        selectedLeague={ defaultLeague }
        onSubmit={ handleOnCreateLeagueSubmit }
        isLoading={ isLoading }
        leagues={ leagues }
        //logos={ logos }
      ></CreateLeagueModal>
    </Container>
  );
}

export default GLLeagues;
