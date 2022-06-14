import Image from 'next/image';

const GLBanner = ({ data = {} }) => {

  const {
    bannerYear, 
    bannerSeason,
    bannerPlace,
    bannerLeague,
    bannerTitleClass,
    bannerLeaguePlaceClass,
    bannerLogo,
    bannerFillColor,
    bannerStokeColor,
    bannerTextColorPrimary,
    bannerPlacementTextColor,
    logoHeight,
    logoWidth,
  } = data;

  return (
      <div className='banner' style={{width: 130, height: 170}}>
        <div style={{color: bannerTextColorPrimary}} className={ bannerTitleClass }>
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
              <span style={{ color: bannerPlacementTextColor }}>{ bannerPlace }</span>
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
