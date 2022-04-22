import React, { useState, useEffect } from "react";
import {
  Container,
} from 'react-bootstrap';
import Image from 'next/image';

import v1Logo from '../../../public/originalGoldenLeopardLogo.png';
import v2Logo from '../../../public/goldenLeopards.png';

const GLBanner = ({ data = {} }) => {

  const { bannerYear, bannerSeason, bannerVersion, bannerLeague, bannerPlace} = data;

  var bannerTitleClass = '';
  var bannerLeaguePlaceClass = '';
  var bannerLogo = [];
  var bannerFillColor = '';
  var bannerStokeColor = '';
  var logoHeight = '';
  var logoWidth = ''

  switch (bannerVersion) {
      case 'v1' :
        bannerTitleClass = 'banner-title banner-title-v1'
        bannerLeaguePlaceClass = 'banner-league-place banner-league-place-v1'
        bannerLogo = v1Logo
        bannerFillColor = 'black'
        bannerStokeColor = 'darkGrey'
        logoHeight = '52px';
        logoWidth = '40px';
        break;
      case 'v2' :
        bannerTitleClass = 'banner-title banner-title-v2'
        bannerLeaguePlaceClass = 'banner-league-place banner-league-place-v2'
        bannerLogo = v1Logo
        bannerFillColor = 'black'
        bannerStokeColor = 'rgba(251, 214, 4, 1)'
        logoHeight = '52px';
        logoWidth = '40px';
        break;
      case 'v3' :
        bannerTitleClass = 'banner-title banner-title-v2'
        bannerLeaguePlaceClass = 'banner-league-place banner-league-place-v2'
        bannerLogo = v2Logo
        bannerFillColor = '#15469d'
        bannerStokeColor = 'rgba(251, 214, 4, 1)'
        logoHeight = '45px';
        logoWidth = '45px';
        break;
      default:
        bannerTitleClass = 'banner-title'
        bannerLeaguePlaceClass = 'banner-league-place'
        bannerLogo = v2Logo
        bannerFillColor = '#15469d'
        bannerFillColor = 'rgba(251, 214, 4, 1)'
        logoHeight = '52px';
        logoWidth = '40px';
        break;
  }

  return (
      <div className='banner' style={{width: 130, height: 170}}>
        <div className={ bannerTitleClass }>
          <div className='banner-year'>
            <span>{ bannerYear }</span>
          </div>
          <div className='banner-season'>
            <span>{ bannerSeason }</span>
          </div>
          <div className='banner-league'>
            <div className='banner-league-name'>
              <span>{ bannerLeague }</span>
            </div>
            <div className={ bannerLeaguePlaceClass }>
              <span>{ bannerPlace }</span>
            </div>
          </div>
          <div className="banner-logo-container">
            <div>
              <Image src={ bannerLogo } alt="Logo" height={ logoHeight } width={ logoWidth }/>
            </div>
          </div>
        </div>
        <svg style={{width: 130, height: 170}}>
          <polygon 
            points="10,10 10,140 65,160 120,140 120,10" 
            style={{
              fill: bannerFillColor, 
              stroke:bannerStokeColor, 
              strokeWidth:7}} />
        </svg>
      </div>
  );
}

export default GLBanner;
