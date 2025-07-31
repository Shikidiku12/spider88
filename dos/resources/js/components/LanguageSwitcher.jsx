import {useTranslation} from "react-i18next";
import "../../sass/components/language-switcher.scss";
import React, {useEffect, useRef, useState} from "react";

export const LanguageSwitcher = () => {
  const [currentLang, setCurrentLang] = useState  ('en');
  const [show, setIsShow] = useState(false);

  const { t, i18n } = useTranslation();

  const ref = useRef();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setCurrentLang(lng);
    setIsShow(false);
  };

  useEffect(() => {
    setCurrentLang(i18n.language.split('-')[0]);

    const handleClickOutside = (event) => {
      if (!ref.current?.contains(event.target)) {
        setIsShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="languages" ref={ref}>
        <div className="languages__selected selected" onClick={() => setIsShow(!show)}>
          <img src={`/images/flags/circle_${currentLang}.png`} className="selected__flag"/>
          <span className="selected__label">{currentLang.toUpperCase()}</span>
          <span className="selected__arrow selected__arrow--down"></span>
        </div>
        {
          show &&
          <div className="languages__content" >
            <ul className="languages__list">
              <li className="languages__list-item item" onClick={() => changeLanguage('en')}>
                <img className="item__flag" src="/images/flags/circle_en.png"/>
                <span className="item__label">EN</span>
              </li>
              <li className="languages__list-item" onClick={() => changeLanguage('zh')}>
                <img className="item__flag" src="/images/flags/circle_zh.png"/>
                <span className="item__label">CN</span>
              </li>
              <li className="languages__list-item" onClick={() => changeLanguage('ms')}>
                <img className="item__flag" src="/images/flags/circle_ms.png"/>
                <span className="item__label">MS</span>
              </li>
            </ul>
          </div>
        }
      </div>

    </>
  )
}
