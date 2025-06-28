import React, { useLayoutEffect, useState, useEffect } from 'react';
import Scroll from 'react-scroll-to-element';
import '../../sass/components/highlight.scss';
import { useTranslation } from "react-i18next";

export const Highlights = ({ setCurrentMenu }) => {
  const [width] = useWindowSize();
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [pwaReady, setPwaReady] = useState(false);

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

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault(); // Prevent automatic prompt
      setDeferredPrompt(e); // Save it to trigger later
      setPwaReady(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    console.log('User choice:', result.outcome);
    setDeferredPrompt(null);
    setPwaReady(false);
  };

  const goTo = (category) => {
    setCurrentMenu(category);
  };

  const handleHighlightScroll = (event) => {
    const scrollLeft = event.target.scrollLeft;
    let cardWidth = 0;
    if (width <= 480) cardWidth = 403;
    if (width <= 767) cardWidth = 303;
    if (width > 767) cardWidth = 103;
    let newIndex = Math.floor((scrollLeft + cardWidth / 2) / cardWidth);
    if (newIndex > 2) newIndex = 2;
    setActiveCardIndex(newIndex);
  };

  return (
    <div className="highlight d-flex">
      <div className="highlight__header d-flex">
        <div className="highlight__title d-flex">
          <span className="highlight__title--text">{t('highlight.highlights')}</span>
        </div>
      </div>

      <div className="highlight__cards" onScroll={handleHighlightScroll}>
        <div className="highlight__cards--slider">
          {[
            { img: 'live.jpg', title: 'articleTitle1', desc: 'articleDescription1', type: 'live' },
            { img: 'progressive.jpg', title: 'articleTitle2', desc: 'articleDescription2', type: 'progressive' },
            { img: 'slots.jpg', title: 'articleTitle3', desc: 'articleDescription3', type: 'slot' },
          ].map(({ img, title, desc, type }, index) => (
            <div className="highlight__card" key={index} style={{ backgroundImage: `url('/images/spider/highlights/${img}')` }}>
              <div className="highlight__card-container">
                <div className="highlight__card-text">
                  <span className="highlight__card--title">{t(`highlight.${title}`)}</span>
                  <span className="highlight__card--description">{t(`highlight.${desc}`)}</span>
                  <Scroll type="id" element="game-list-section" offset={width >= 768 ? -160 : -80}>
                    <button className="highlight__card--btn">{t('play-now')}
                      <span className="highlight__card--btn-span" onClick={() => goTo(type)}></span>
                    </button>
                  </Scroll>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="highlight__indicator d-xl-none">
        {[0, 1, 2].map(i => (
          <span key={i} className={activeCardIndex === i ? 'highlight__indicator-active-dot' : i === 2 ? 'highlight__indicator-third-dot' : 'highlight__indicator-dot'}></span>
        ))}
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
            <span className="highlight__download-description">{t('download.description')}</span>
            <div className="highlight__download-action">

              <button
                className="highlight__download-btn highlight__download-btn--solid"
                onClick={handleInstall}
                disabled={!pwaReady}
              >
                <div className="highlight__download-btn-wrapper">
                  <span className="highlight__download-btn-text">{t('download.for-android')}</span>
                  <span className="highlight__download-btn--solid-icon">
                    <img src="/images/spider/download/android.svg" alt="Install PWA on Android" />
                  </span>
                </div>
              </button>

              <button
                className="highlight__download-btn highlight__download-btn--outline"
                onClick={handleInstall}
                disabled={!pwaReady}
              >
                <div className="highlight__download-btn-wrapper">
                  <span className="highlight__download-btn-text">{t('download.for-windows')}</span>
                  <span className="highlight__download-btn--outline-icon">
                    <img src="/images/spider/download/windows.svg" alt="Install PWA on Windows" />
                  </span>
                </div>
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
