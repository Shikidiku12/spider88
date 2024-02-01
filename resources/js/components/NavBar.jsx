import React, {useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import axios from "axios";
import '../../sass/components/navbar.scss';
import {useTranslation} from "react-i18next";
import {LanguageSwitcher} from "@/components/LanguageSwitcher.jsx";

export const NavBar = ({ setIsShowModal, setIsLogin, setUser, isLogin, setToastMessage, currentMenu, setCurrentMenu, setLocalSearch, user }) => {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768);
  const [search, setSearch] = useState('');
  const [balance, setBalance] = useState(0);
  const [sidebarContent, setSidebarContent] = useState('categories');

  const { t, i18n } = useTranslation();

  const submitSearch = (ev) => {
    ev.preventDefault();
    setLocalSearch(search);
  };

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
    setLocalSearch(search);
  }

  const logout = () => {
    setUser({
      username: '',
      password: ''
    });
    setIsLogin(false);
    Cookies.remove('password');
    setToastMessage('You have successfully logged out!');
    window.iapiLogout(1, 1);
  };

  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }

  const openSidebar = (content) => {
    if (window.innerWidth < 768) {
      setIsOpen(!isOpen);
      setSidebarContent(content);
    }
  }

  const changeCategory = (category) => {
    setCurrentMenu(category);
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  }

  useEffect(() => {

    window.addEventListener("resize", handleResize);
    window.addEventListener("click", (e) => {
      if(e.target.className.includes('nav__contents')) {
        if (window.innerWidth < 768) {
          setIsOpen(false);
        }
      }
    });
  });

  useEffect(() => {
    const playerName = user.username;

    const init = async () => {
      try {
        const response = await axios.get('/api/get-balance/'+ playerName);
        setBalance(response.data.balance);
      } catch (err) {
        console.log('err', err);
      } finally {

      }
    };

   if(isLogin) {
     init();

     setInterval(() => {
       init();
     },15000);
   }

  },[isLogin])

  return (
    <React.Fragment>
      <nav className={`nav ${isOpen ? 'nav__open' : ''}`}>
        <div className="main-content nav__wrapper">
          <div className="nav__container main-content__wrapper d-flex">
            <div className="nav__icons d-flex">
              <div className={`nav__hamburger ${isOpen ? 'open' : ''}`} onClick={ () => {
                openSidebar('categories');
              }}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="nav__logo"
                   onClick={() => {
                     setCurrentMenu('top');
                     window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
                   }}
              ></div>
              <div className="nav__logo-text-container">
                <div className="nav__logo--text"></div>
              </div>
            </div>
            <div className="d-flex nav__actions-container">
              <div className=" d-none d-lg-block">
                <LanguageSwitcher/>
              </div>

              {isLogin &&
                <div className="d-flex nav__actions">
                  <button
                    className="nav__balance">RM {balance.toLocaleString('en', {minimumFractionDigits: 2})}</button>
                </div>
              }
              <div className="nav__divider"></div>
              <div className="d-flex nav__actions">
                {!isLogin &&
                  <div className="nav__login" id="login">
                    <button className="nav__login--btn" onClick={() => setIsShowModal(true)}>Login</button>
                  </div>
                }

                {isLogin &&
                  <div className="nav__logout" id="login">
                    <button className="nav__logout--btn" onClick={() => logout()} title="Logout">
                      <img src="/images/logout.svg"/>
                    </button>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>

        {
          isOpen &&
          <div className="nav__contents d-flex">
            {
              sidebarContent === 'categories' &&
              <div className="nav__sidebar">
                <div className="nav__sidebar-list d-flex">
                  <div className="nav__sidebar-item grouped">
                    <div className={`nav__sidebar-group ${currentMenu === 'top' ? 'nav__sidebar-group--active' : ''}`}
                         onClick={() => changeCategory('top')}>
                      <img className="nav__sidebar-icon" src="/images/menu-icons/top-games.png" alt=""/>
                      <span className="nav__sidebar-label">{t('menu.top-games')}</span>
                    </div>
                    <div className={`nav__sidebar-group ${currentMenu === 'all' ? 'nav__sidebar-group--active' : ''}`}
                         onClick={() => changeCategory('all')}>
                      <img className="nav__sidebar-icon" src="/images/menu-icons/all-games.png" alt=""/>
                      <span className="nav__sidebar-label">{t('menu.all-games')}</span>
                    </div>
                    <div className={`nav__sidebar-group ${currentMenu === 'slot' ? 'nav__sidebar-group--active' : ''}`}
                         onClick={() => changeCategory('slot')}>
                      <img className="nav__sidebar-icon" src="/images/menu-icons/slot-games.png" alt=""/>
                      <span className="nav__sidebar-label">{t('menu.slot-games')}</span>
                    </div>
                    <div className={`nav__sidebar-group ${currentMenu === 'live' ? 'nav__sidebar-group--active' : ''}`}
                         onClick={() => changeCategory('live')}>
                      <img className="nav__sidebar-icon" src="/images/menu-icons/live-casino.png" alt=""/>
                      <span className="nav__sidebar-label">{t('menu.live-casino')}</span>
                    </div>
                    <div
                      className={`nav__sidebar-group ${currentMenu === 'progressive' ? 'nav__sidebar-group--active' : ''}`}
                      onClick={() => changeCategory('progressive')}>
                      <img className="nav__sidebar-icon" src="/images/menu-icons/progressive-games.png" alt=""/>
                      <span className="nav__sidebar-label">{t('menu.progressive-games')}</span>
                    </div>
                  </div>
                </div>
                <div className="d-lg-none w-100">
                  <LanguageSwitcher/>
                </div>
                {/*<form onSubmit={(ev) => submitSearch(ev)}>*/}
                {/*  <div className="nav__sidebar__filter">*/}
                {/*    <div className="nav__sidebar__filter__search-wrapper">*/}
                {/*      <input*/}
                {/*        value={search}*/}
                {/*        onChange={handleInputChange}*/}
                {/*        type="text" placeholder="Search Games"/>*/}
                {/*      <span className="nav__sidebar__filter__search-wrapper--icon">*/}
                {/*        <img src="/images/icons/search.png"/>*/}
                {/*      </span>*/}
                {/*    </div>*/}
                {/*  </div>*/}
                {/*</form>*/}
              </div>
            }
          </div>
        }

      </nav>
    </React.Fragment>
  )
    ;
};
