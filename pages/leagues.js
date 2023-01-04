import React, { useState, useEffect, useRef } from "react";
import { 
  getLeagues,
  createLeague,
  updateLeague
} from '../src/api/goldenLeopardsApi';
import {
  Container,
  Button,
  Badge,
  Accordion,
  useAccordionButton,
  Card,
  Nav
} from 'react-bootstrap';

import styled from 'styled-components';

import GLLink from "../src/components/multiuse/glLink";
import CreateLeagueModal from "../src/components/modals/createLeagueModal";

import { defaultLeague } from "../src/components/leagues/leagueProperties";
import { typeColors } from "../src/components/leagues/leagueProperties";
import GLLeagueLegend from "../src/components/leagues/leagueLegend";

export async function getServerSideProps() {
  const ssLeagues = await getLeagues();
  return {props: { ssLeagues }};
}

const GLVerticalBar = styled.div`
  border-left: 3px solid ${props => props.color || 'black'};
  border-radius: 3px;
  height: 50px;
`

const typeIndicator = {
  season: (<GLVerticalBar color={typeColors.season}></GLVerticalBar>),
  tournament: (<GLVerticalBar color={ typeColors.tournament }></GLVerticalBar>),
  friendly: (<GLVerticalBar color={ typeColors.friendly }></GLVerticalBar>)
}

const leaguePlacement = {
  first: <i style={{color: 'gold'}} className="bi bi-trophy-fill"></i>,
  second: <i style={{color: 'silver'}} className="bi bi-trophy-fill"></i>
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
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  
  const modalRef = useRef(null);

  const handleCreateLeague = () => {
    setShowCreateLeagueModal(true);
  }

  const handleCloseCreateLeagueModal = () => {
    setShowCreateLeagueModal(false);
    setSelectedLeague(null);
    setIsEditing(false);
  }

  const handleOnExit = () => {
    setIsLoading(false);
    setSelectedLeague(null);
    setIsEditing(false);
  }

  const handleOnCreateLeagueSubmit = async (league) => {
    try {
      setIsLoading(true);
      if (isEditing) {
        await updateLeague(league);
      } else {
        await createLeague(league);
      }
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

  const handleEditLeague = async (league) => {
    setSelectedLeague(league);
    setIsEditing(true);
    setShowCreateLeagueModal(true);
  }

  const handleLinkClick = (e) => {
    e.stopPropagation();
    return true;
  }

  return (
    <Container fluid style={{
      backgroundColor: 'white'
    }}>
      <Container style={{
        padding: '40px 12px 0 12px'
      }}>
        <GLLeagueLegend></GLLeagueLegend>
        {
          leagues.map(l => {
            const eventKey = l.id;
            return (
              <Accordion key={ l.id }>
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
                          { typeIndicator[l.type] }
                          <div style={{
                            marginLeft: '5px',
                            flexGrow: 1,
                            textAlign: 'center'
                          }}>
                            <div>
                              <GLLink href={`/leagues/${encodeURIComponent(l.id)}`} name={ l.displayname } onClick={ handleLinkClick }></GLLink>
                            </div>
                            { l.wins &&
                              <span style={{
                                fontWeight: 500,
                                fontSize: 'small',
                                color: 'rgb(125, 125, 125)'
                              }}>
                                {`(${l.wins}-${l.losses}-${l.ties})`}
                              </span>
                            }
                          </div>
                          <div>
                            {
                              l.placement &&
                              leaguePlacement[l.placement]
                            }
                          </div>
                        </div>
                      </div>
                      </CustomToggle>
                    </div>
                  </Card.Header>
                  <Accordion.Collapse eventKey={ eventKey }>
                    <Card.Body style={{
                      padding: '12px 0 0 0'
                    }}>
                      <div>
                        <Button
                          style={{
                            color: '#15469d',
                            borderColor: '#15469d',
                            backgroundColor: 'white'
                          }}
                          size="sm"
                          onClick={ () => handleEditLeague(l) }
                        ><i className="bi bi-pencil"></i></Button>
                      </div>
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
        padding: '3px 12px 12px 12px'
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
        selectedLeague={ selectedLeague ? selectedLeague : defaultLeague }
        onSubmit={ handleOnCreateLeagueSubmit }
        isLoading={ isLoading }
        leagues={ leagues }
        isEditing= { isEditing }
        //logos={ logos }
      ></CreateLeagueModal>
    </Container>
  );
}

export default GLLeagues;
