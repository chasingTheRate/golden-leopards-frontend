import React, { useState, useEffect, useRef } from "react";

import {
  Container,
} from 'react-bootstrap';
import Image from 'next/image';
import styled from 'styled-components';

import GLLink from "../multiuse/glLink";

const GLLeagueLogo = ({
  logofilename,
  logoheight,
  logowidth
}) => {
  return (
    logofilename
    ? <div>
        <Image src={ `https://d33nclgf902cx6.cloudfront.net/assets/leagues/${ logofilename }` } alt="leagueLogo" height={ logoheight } width={ logowidth }/>
      </div>
    : null
  )
}

const GLSchLinkTitleContainer = styled.div`
  font-weight: 700;
  text-align: center;
  padding-bottom: 10px;
  font-size: small;
`
const GLSchTitleContainer = styled.div`
  color: rgba(251, 214, 4, 1) !important;
  font-weight: 700;
  text-align: center;
  padding-bottom: 10px;
  font-size: medium;
`
const GLLeagueTitle = ({
  scheduleurl,
  displayname
}) => (
  scheduleurl
    ? <GLSchLinkTitleContainer>
        <GLLink href={ scheduleurl } name={ displayname }></GLLink>
      </GLSchLinkTitleContainer>
    : <GLSchTitleContainer>
        <span>{ displayname }</span>
      </GLSchTitleContainer>
)


const GLLeagueHeader = ({ league }) => {

  const {
    displayname='',
    logofilename = '',
    logoheight = 60,
    logowidth = 60,
    scheduleurl = '',
  } = league

  return (
    <Container style={{display: 'flex', flexDirection: 'column', alignItems: "center", justifyContent: 'center'}}>
      <GLLeagueLogo 
        logofilename={ logofilename }
        logoheight= {logoheight} 
        logowidth={ logowidth }
        scheduleurl={ scheduleurl }
      ></GLLeagueLogo>
      <GLLeagueTitle
        scheduleurl={ scheduleurl }
        displayname={ displayname }
      ></GLLeagueTitle>
    </Container>
  );
}

export default GLLeagueHeader;
