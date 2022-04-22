import React, { useState, useEffect } from "react";
import {
  Container,
} from 'react-bootstrap';

import Banner from '../src/components/banner/banner';

const GLAchievements = () => {

  const data = [
    {
      bannerYear: '2021',
      bannerSeason: 'FALL', 
      bannerVersion: 'v3',
      bannerLeague: 'RECREATION', 
      bannerPlace: 'CHAMPIONS'
    },
    {
      bannerYear: '2021',
      bannerSeason: 'SPRING', 
      bannerVersion: 'v2',
      bannerLeague: 'RECREATION', 
      bannerPlace: 'CHAMPIONS'
    },
    {
      bannerYear: '2019',
      bannerSeason: 'FALL', 
      bannerVersion: 'v1',
      bannerLeague: 'RECREATION', 
      bannerPlace: 'CHAMPIONS'
    },
  ]

  return (
    <Container fluid className="achievements-page-container">
        <div className='achievement-section achievement-section-first'>
          <span>Dash Recreation League</span>
          <div className="banners-container">
            { data.map((d, i) => <Banner key={ `banner-${i}` } data={ d }></Banner>) }
          </div>
        </div>
        <div className='achievement-section'>
          <span>Tournaments</span>
        </div>
    </Container>
  );
}

export default GLAchievements;
