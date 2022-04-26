import React, { useState, useEffect } from "react";
import {
  Container,
} from 'react-bootstrap';

import Banner from '../src/components/banner/banner';
import Test from '../public/soccer-jersey.svg';

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
        {/* <Container style={{width: '300px', hieght: '300px', marginBottom: '1000px'}}>
          <div>
            <svg x="0px" y="0px" viewBox="0 0 496.2 496.2">
              <path style={{fill: 'rgba(251, 214, 4, 1)'}} d="M146.9,215.7c-0.5,1.5-2.1,2.3-3.5,1.8l-45-14.5c-1.5-0.5-2.3-2.1-1.8-3.5l1.9-6.2l50.3,16.2
                L146.9,215.7z"/>
              <path style={{fill: 'rgba(251, 214, 4, 1)'}} d="M155.8,405l-1.5,10.5c0,0,32.5,13.2,93.4,13.2s94.1-13.2,94.1-13.2l-1.5-10.5H155.8z"/>
              <path style={{fill: '#15469d'}} d="M386.3,149.1c-5.7-35.1-24.9-39.6-24.9-39.6l-72.1-29.4l-9.8-4.8l-31.1-2.5l-31.7,2.6l-9.8,4.8
                l-72.1,29.4c0,0-19.1,4.5-24.9,39.6l-11.4,44.2l50.3,16.2l5.8-19c0,0,21.1,59.4,1.3,214.5c0,0,31.6,13.1,91.9,13.1
                s92.6-13.1,92.6-13.1c-19.8-155.1,1.3-214.5,1.3-214.5l5.8,19l50.3-16.2L386.3,149.1z"/>
              <polygon style={{fill: '#15469d'}} points="289.3,90.7 282.5,75.3 248.4,72.8 213.7,75.3 206.9,90.7 238.2,123.2 258,123.2 "/>
              <path style={{fill: 'rgba(251, 214, 4, 1)'}} d="M349.3,215.7c0.5,1.5,2.1,2.3,3.5,1.8l45-14.5c1.5-0.5,2.3-2.1,1.8-3.5l-1.9-6.2l-50.3,16.2
                L349.3,215.7z"/>
              <path style={{fill: 'rgba(251, 214, 4, 1)'}} d="M285.7,78.6c0,0-14.8-1.9-37.3-1.9s-37.8,1.9-37.8,1.9l6-6.7c0,0,10.8-1.7,31.8-1.7
                c21.1,0,31.4,1.7,31.4,1.7L285.7,78.6z"/>
              <path style={{fill: 'rgba(251, 214, 4, 1)'}} d="M279.8,71.8c0,0,15.9,12.6,7.6,25.7s-35,34.1-35,34.1l-4-10.3C248.3,121.3,293.8,94.5,279.8,71.8z"/>
              <path style={{fill: 'rgba(251, 214, 4, 1)'}} d="M216.5,71.8c0,0-16,12.6-7.7,25.7s35,34.1,35,34.1l4.5-10.3C248.3,121.3,202.5,94.5,216.5,71.8z"/>
              <polygon style={{fill: 'rgba(251, 214, 4, 1)'}} points="252.4,141 243.7,141 243.7,124.6 248.3,121.3 252.4,121.3 "/>
            </svg>
            <div><span>10</span></div>
          </div>

        </Container> */}
    </Container>
  );
}

export default GLAchievements;
