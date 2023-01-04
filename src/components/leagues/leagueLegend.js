import React from "react";
import styled from 'styled-components';

import { typeColors } from './leagueProperties';

const GLLeagueLegendColorCircle = styled.div`
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: ${props => props.color || 'black'}
`
const GLLeagueLegendItemName = styled.span`
  padding-left: 6px;
`
const GLLeagueLegendItemContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`

const GLLeagueLegend = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center', 
      padding: '12px 12px 24px 12px',
      color: 'rgb(150,150,150)',
      fontSize: 'small',
      fontWeight: '500'
    }}>
      <GLLeagueLegendItemContainer>
        <GLLeagueLegendColorCircle color={ typeColors.season }></GLLeagueLegendColorCircle>
        <GLLeagueLegendItemName>League</GLLeagueLegendItemName>
      </GLLeagueLegendItemContainer>
      <GLLeagueLegendItemContainer>
        <GLLeagueLegendColorCircle color={ typeColors.tournament }></GLLeagueLegendColorCircle>
        <GLLeagueLegendItemName>Tournament</GLLeagueLegendItemName>
      </GLLeagueLegendItemContainer>
      <GLLeagueLegendItemContainer>
        <GLLeagueLegendColorCircle color={ typeColors.friendly }></GLLeagueLegendColorCircle>
        <GLLeagueLegendItemName>Friendly</GLLeagueLegendItemName>
      </GLLeagueLegendItemContainer>
    </div>
  );
}

export default GLLeagueLegend;
