import React from "react";
import {
  Badge
} from 'react-bootstrap';
import moment from "moment";
import Image from 'next/image';

import logo from '../../../public/goldenLeopards.png';

const GLGameResultItem = ({ record }) => {
  const { 
    ourScore, 
    opponentScore, 
    opponentShortName = 'OPP',
    opponentLogoLink
  } = record;

  console.log('test');

  return (
    <div className='grli'>
        <div className='grli-score-container'>
            <div className='grli-logo-top-container'>
              <div className='grli-logo-container'>
                <div>
                  <Image src={logo} alt="Logo" height="40px" width="40"/>
                </div>
                <div className='grli-team-name-text-container'>
                  <span>GL</span>
                </div>
              </div>
            </div>
            <div className='grli-score-text-container'>
              <span>{ ourScore }</span>
            </div>
            <div className='grli-half-text-container'>
              <span>FT</span>
            </div>
            <div className='grli-score-text-container'>
              <span>{ opponentScore }</span>
            </div>
            <div className='grli-logo-top-container grli-opp-logo-container'>
              <div className='grli-logo-container'>
                <div>
                  { opponentLogoLink 
                    ? <Image src={logo} alt="Logo" height="40px" width="40"/>
                    : <div className='grli-logo-placeholder'></div>
                  }
                </div>
                <div className='grli-team-name-text-container'>
                  <span>{ opponentShortName }</span>
                </div>
              </div>
            </div>
        </div>
        <hr style={{flexGrow: 1}}></hr>
      </div>
      );
}

export default GLGameResultItem;
