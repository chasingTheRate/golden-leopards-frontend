import React, { useState, useEffect } from "react";
import {
  Container,
} from 'react-bootstrap';
import Image from 'next/image';

import logo from '../public/originalGoldenLeopardLogo.png';

import { getSeasonSchedule } from '../src/api/goldenLeopardsApi';

// export async function getServerSideProps() {
//   const data = await getSeasonSchedule();
//   return { props: { data } }
// }

const GLAchievements = ({ data = [] }) => {
  return (
    <Container fluid className="achievements-page-container">
        <div>
          <span>Spring 2022</span>
        </div>
        <div>
          <span>Recreation Division</span>
          <div className='banner' style={{width: 130, height: 170}}>
            <div className='banner-title'>
              <div className='banner-year'>
                <span>2018</span>
              </div>
              <div className='banner-season'>
                <span>FALL</span>
              </div>
              <div className='banner-conference'>
                <div className='banner-conference-name'>
                  <span>RECREATION</span>
                </div>
                <div className='banner-conference-place'>
                  <span>CHAMPIONS</span>
                </div>
              </div>
              <div className="achievement-logo-container">
                <div>
                  <Image src={logo} alt="Logo" height="52px" width="40px"/>
                </div>
              </div>
            </div>
            <svg style={{width: 130, height: 170}}>
              <polygon points="10,10 10,140 65,160 120,140 120,10" style={{fill:'black', stroke:'darkGrey', strokeWidth:7}} />
            </svg>
          </div>
        </div>
        <div>
          <span>Tournaments</span>
        </div>
    </Container>
  );
}

export default GLAchievements;
