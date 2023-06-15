import React, { useState, useEffect } from "react";
import {
  Container,
} from 'react-bootstrap';

import Banner from '../src/components/banner/banner';
import TournamentBanner from '../src/components/banner/tournamentBanner';

const GLAchievements = () => {

  const data = [
    {
      bannerYear: '2023',
      bannerSeason: 'SPRING', 
      bannerVersion: 'v3',
      bannerLeague: 'EASTERN DIVISION 2', 
      bannerPlace: 'CHAMPIONS'
    },
    {
      bannerYear: '2022',
      bannerSeason: 'FALL', 
      bannerVersion: 'v3',
      bannerLeague: '11v11 RECREATION', 
      bannerPlace: 'CHAMPIONS'
    },
    {
      bannerYear: '2022',
      bannerSeason: 'FALL', 
      bannerVersion: 'v3',
      bannerLeague: '9v9 RECREATION', 
      bannerPlace: 'CHAMPIONS'
    },
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

  const tournaments = [
    {
      bannerLeague: 'SOUTH TEXAS CUP',
      bannerYear: '2023',
      bannerSeason: 'SPRING',
      bannerPlace: 'CHAMPIONS',
      bannerTitleClass: 'banner-title banner-title-v1',
      bannerLeaguePlaceClass: 'banner-league-place banner-league-place-v1',
      bannerLogo: 'https://d33nclgf902cx6.cloudfront.net/assets/bannerLogos/southTexasCup.jpeg',
      bannerFillColor: 'white',
      bannerStokeColor: 'navy',
      bannerTextColorPrimary: 'navy',
      bannerPlacementTextColor: 'red',
      logoHeight: '50px',
      logoWidth: '50px',
    },
    {
      bannerLeague: 'AGGIELAND CLASSIC',
      bannerYear: '2023',
      bannerSeason: 'WINTER',
      bannerPlace: 'FINALIST',
      bannerTitleClass: 'banner-title banner-title-v1',
      bannerLeaguePlaceClass: 'banner-league-place banner-league-place-v1',
      bannerLogo: 'https://d33nclgf902cx6.cloudfront.net/assets/bannerLogos/calvary.png',
      bannerFillColor: 'black',
      bannerStokeColor: 'gray',
      bannerTextColorPrimary: 'white',
      bannerPlacementTextColor: 'red',
      logoHeight: '52px',
      logoWidth: '40px',
    },
    {
      bannerLeague: 'SPRING SHOWDOWN',
      bannerYear: '2022',
      bannerSeason: 'SPRING',
      bannerPlace: 'CHAMPIONS',
      bannerTitleClass: 'banner-title banner-title-v1',
      bannerLeaguePlaceClass: 'banner-league-place banner-league-place-v1',
      bannerLogo: 'https://d33nclgf902cx6.cloudfront.net/assets/bannerLogos/springShootout.png',
      bannerFillColor: 'white',
      bannerStokeColor: '#ff2fa3',
      bannerTextColorPrimary: '#02b2bb',
      bannerPlacementTextColor: '#ff2fa3',
      logoHeight: '60px',
      logoWidth: '60px',
    },
    {
      bannerLeague: 'SPRING SHOWDOWN',
      bannerYear: '2022',
      bannerSeason: 'SPRING',
      bannerPlace: 'FINALIST',
      bannerTitleClass: 'banner-title banner-title-v1',
      bannerLeaguePlaceClass: 'banner-league-place banner-league-place-v1',
      bannerLogo: 'https://d33nclgf902cx6.cloudfront.net/assets/bannerLogos/springShowdown.png',
      bannerFillColor: 'white',
      bannerStokeColor: '#fd9300',
      bannerTextColorPrimary: '#90bae8',
      bannerPlacementTextColor: '#fd9300',
      logoHeight: '52px',
      logoWidth: '52px',
    },
    {
      bannerLeague: 'AGGIELAND CLASSIC',
      bannerYear: '2022',
      bannerSeason: 'WINTER',
      bannerPlace: 'CHAMPIONS',
      bannerTitleClass: 'banner-title banner-title-v1',
      bannerLeaguePlaceClass: 'banner-league-place banner-league-place-v1',
      bannerLogo: 'https://d33nclgf902cx6.cloudfront.net/assets/bannerLogos/calvary.png',
      bannerFillColor: 'black',
      bannerStokeColor: 'gray',
      bannerTextColorPrimary: 'white',
      bannerPlacementTextColor: 'red',
      logoHeight: '52px',
      logoWidth: '40px',
    }
  ]

  return (
    <Container fluid className="achievements-page-container">
        <div className='achievement-section achievement-section-first'>
          <span>Leagues</span>
          <div className="banners-container">
            { data.map((d, i) => <Banner key={ `banner-${i}` } data={ d }></Banner>) }
          </div>
        </div>
        <div className='achievement-section'>
          <span>Tournaments</span>
          <div className="banners-container">
            { tournaments.map((t, i) => <TournamentBanner key={ `banner-${i}` } data={ t }></TournamentBanner>) }
          </div>
        </div>
    </Container>
  );
}

export default GLAchievements;
