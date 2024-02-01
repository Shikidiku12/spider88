import React, {useLayoutEffect, useState} from 'react';
import Scroll from 'react-scroll-to-element';

import '../../sass/components/highlight.scss';
import {useTranslation} from "react-i18next";

export const Highlights = ({ setCurrentMenu }) => {
  const [width] = useWindowSize();
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const { t } = useTranslation();

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
          <span className="highlight__title--text">{t('highlight.highlights')}</span>
        </div>
      </div>

          <div className="highlight__cards" onScroll={handleHighlightScroll}>
            <div className="highlight__cards--slider" >
              <div className="highlight__card" style={{backgroundImage: "url('/images/highlight-bg-1.png')"}}>
                <div className="highlight__card-container">
                  <div className="highlight__card-text">
                    <span className="highlight__card--title">{t('highlight.articleTitle1')}</span>
                    <span className="highlight__card--description">{t('highlight.articleDescription1')}</span>
                    <Scroll type="id" element="game-list-section" offset={width >= 768 ? -160 : -80}>
                      <button className="highlight__card--btn">{t('play-now')}
                        <span className="highlight__card--btn-span" onClick={() => goTo('live')}></span>
                      </button>
                    </Scroll >
                  </div>
                </div>
              </div>

              <div className="highlight__card" style={{backgroundImage: "url('/images/highlight-bg-2.png')"}}>
                <div className="highlight__card-container">
                  <div className="highlight__card-text">
                    <span className="highlight__card--title">{t('highlight.articleTitle2')}</span>
                    <span className="highlight__card--description">{t('highlight.articleDescription2')}</span>
                    <Scroll type="id" element="game-list-section" offset={width >= 768 ? -160 : -80}>
                      <button className="highlight__card--btn">{t('play-now')}
                        <span className="highlight__card--btn-span" onClick={() => goTo('progressive')}></span>
                      </button>
                    </Scroll >
                  </div>
                </div>
              </div>

              <div className="highlight__card" style={{backgroundImage: "url('/images/highlight-bg-3.png')"}}>
                <div className="highlight__card-container">
                  <div className="highlight__card-text">
                    <span className="highlight__card--title">{t('highlight.articleTitle3')}</span>
                    <span className="highlight__card--description">{t('highlight.articleDescription3')}</span>
                    <Scroll type="id" element="game-list-section" offset={width >= 768 ? -160 : -80}>
                      <button className="highlight__card--btn">{t('play-now')}
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
          <span className="highlight__title--text">{t('download.download-the-app')}</span>
        </div>
      </div>

      <div className="highlight__download">
        <div className="highlight__download-container">
          <div className="highlight__download-accent"></div>
          <div className="highlight__download-texts">
            <span className="highlight__download-title">{t('download.title')}</span>
            <span
              className="highlight__download-description">{t('download.description')}</span>
            <div className="highlight__download-action">
              <a href="https://pt.launcher.horizon88.com/materials/apk/Spider88_v2.1.apk"
                 className="highlight__download-btn highlight__download-btn--solid">
                <div className="highlight__download-btn-wrapper">
                  <span className="highlight__download-btn-subtext">{t('download.download-app')}</span>
                  <span className="highlight__download-btn-text">{t('download.for-android')}</span>
                  <span className="highlight__download-btn--solid-icon">
                        <img src="/images/android.svg"/>
                      </span>
                </div>
              </a>
              <a href="https://pt.launcher.horizon88.com/materials/dl/spider88_dl_v2.1.exe"
                 className="highlight__download-btn highlight__download-btn--outline">
                <div className="highlight__download-btn-wrapper">
                  <span className="highlight__download-btn-subtext">{t('download.download-app')}</span>
                  <span className="highlight__download-btn-text">{t('download.for-windows')}</span>
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
