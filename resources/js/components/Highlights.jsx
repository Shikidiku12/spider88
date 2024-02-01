import React, {useLayoutEffect, useState} from 'react';
import Scroll from 'react-scroll-to-element';

import '../../sass/components/highlight.scss';

export const Highlights = ({ setCurrentMenu }) => {
  const [width] = useWindowSize();
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  
  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  }

  const goTo = (category) => {
      setCurrentMenu(category);
  }

  const handleHighlightScroll = (event) => {
    const scrollLeft = event.target.scrollLeft;
    let cardWidth = 0;
    if(width <= 480) cardWidth = 403
    if(width <= 767) cardWidth = 303
    if(width > 767) cardWidth = 103
    let newIndex = Math.floor((scrollLeft + cardWidth / 2) / cardWidth)

    if(newIndex > 2) newIndex = 2;
    setActiveCardIndex(newIndex);
  };

  return (
    <div className="highlight d-flex" >
      <div className="highlight__header d-flex">
        <div className="highlight__title d-flex">
          <div className="highlight__title--icon" style={{backgroundImage: "url('/images/star.png')"}}>
          </div>
          <span className="highlight__title--text"> Highlights </span>
        </div>
      </div>

          <div className="highlight__cards" onScroll={handleHighlightScroll}>
            <div className="highlight__cards--slider" >
              <div className="highlight__card" style={{backgroundImage: "url('/images/highlight-bg-1.png')"}}>
                <div className="highlight__card-container">
                  <div className="highlight__card-text">
                    <span className="highlight__card--title">Live Games</span>
                    <span className="highlight__card--description">Choose the champion!</span>
                    <Scroll type="id" element="game-list-section" offset={width >= 768 ? -160 : -80}>
                      <button className="highlight__card--btn">Play Now
                        <span className="highlight__card--btn-span" onClick={() => goTo('live')}></span>
                      </button>
                    </Scroll >
                  </div>
                </div>
              </div>

              <div className="highlight__card" style={{backgroundImage: "url('/images/highlight-bg-2.png')"}}>
                <div className="highlight__card-container">
                  <div className="highlight__card-text">
                    <span className="highlight__card--title">Progressive Games</span>
                    <span className="highlight__card--description">Discover our premium games</span>
                    <Scroll type="id" element="game-list-section" offset={width >= 768 ? -160 : -80}>
                      <button className="highlight__card--btn">Play Now
                        <span className="highlight__card--btn-span" onClick={() => goTo('progressive')}></span>
                      </button>
                    </Scroll >
                  </div>
                </div>
              </div>

              <div className="highlight__card" style={{backgroundImage: "url('/images/highlight-bg-3.png')"}}>
                <div className="highlight__card-container">
                  <div className="highlight__card-text">
                    <span className="highlight__card--title">Slot Club</span>
                    <span className="highlight__card--description">Spin your way to riches</span>
                    <Scroll type="id" element="game-list-section" offset={width >= 768 ? -160 : -80}>
                      <button className="highlight__card--btn">Play Now
                        <span className="highlight__card--btn-span" onClick={() => goTo('slot')}></span>
                      </button>
                    </Scroll >
                  </div>
                </div>
              </div>
            </div>
          </div>

      <div className='highlight__indicator d-xl-none'>
        <span className={activeCardIndex === 0 ? 'highlight__indicator-active-dot' : 'highlight__indicator-third-dot'}></span>
        <span className={activeCardIndex === 1 ? 'highlight__indicator-active-dot' : 'highlight__indicator-dot'}></span>
        <span className={activeCardIndex === 2 ? 'highlight__indicator-active-dot' : 'highlight__indicator-third-dot'}></span>
      </div>

      <div className="highlight__header d-flex">
        <div className="highlight__title d-flex">
          <span className="highlight__title--text">Download The App</span>
        </div>
      </div>

      <div className="highlight__download">
        <div className="highlight__download-container">
          <div className="highlight__download-accent"></div>
          <div className="highlight__download-texts">
            <span className="highlight__download-title">Win big jackpot!</span>
            <span
              className="highlight__download-description">Don't miss out on your chance to win life-changing money!</span>
            <div className="highlight__download-action">
              <a href="https://pt.launcher.horizon88.com/materials/apk/Spider88_v2.1.apk"
                 className="highlight__download-btn highlight__download-btn--solid">
                <div className="highlight__download-btn-wrapper">
                  <span className="highlight__download-btn-subtext">Download app</span>
                  <span className="highlight__download-btn-text">For Android</span>
                  <span className="highlight__download-btn--solid-icon">
                        <img src="/images/android.svg"/>
                      </span>
                </div>
              </a>
              <a href="https://pt.launcher.horizon88.com/materials/dl/spider88_dl_v2.1.exe"
                 className="highlight__download-btn highlight__download-btn--outline">
                <div className="highlight__download-btn-wrapper">
                  <span className="highlight__download-btn-subtext">Download app</span>
                  <span className="highlight__download-btn-text">For Windows</span>
                  <span className="highlight__download-btn--outline-icon">
                        <img src="/images/windows.svg"/>
                      </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
    ;
};