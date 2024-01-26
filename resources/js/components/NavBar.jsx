import React, {useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import axios from "axios";

export const NavBar = ({ setIsShowModal, setIsLogin, setUser, isLogin, setToastMessage, setCurrentMenu, setLocalSearch }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('');
  const [balance, setBalance] = useState(0);

  const submitSearch = (ev) => {
    ev.preventDefault();
    setLocalSearch(search);
  };

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

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    const playerName = Cookies.get('pas[flyingdragon88][real][username]') ?? 'SPIDER88_TEST01';

    const init = async () => {
      try {
        const response = await axios.get('/api/get-balance/'+ playerName);
        setBalance(response.data.balance);
      } catch (err) {
        console.log('err', err);
      } finally {

      }
    };
    init();

    setInterval(() => {
      init();
    },15000)
  })

  return (
    <React.Fragment>
      <nav className="nav nav__open">
        <div className="main-content nav__wrapper">
          <div className="nav__container main-content__wrapper d-flex">
            <div className="nav__icons d-flex">
              <div className="nav__hamburger">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="nav__logo"></div>
              <div className="nav__logo-text-container">
                <div className="nav__logo--text"></div>
              </div>
            </div>
            <div className="d-flex nav__actions-container">
              {isLogin &&
                <div className="d-flex nav__actions">
                  <button className="nav__balance">RM {balance.toLocaleString()}</button>
                </div>
              }
              <div className="nav__divider"></div>
              <div className="d-flex nav__actions">
                { !isLogin &&
                  <div className="nav__login" id="login">
                    <button className="nav__login--btn" onClick={() =>setIsShowModal(true)}>Login</button>
                  </div>
                }

                {isLogin &&
                  <div className="nav__login" id="login">
                    <button className="nav__login--btn" onClick={() => logout()}>Logout</button>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>

        <div className="nav__contents main-content d-flex">
          <div className="nav__sidebar main-content__wrapper">
            <div className="nav__sidebar-list  d-flex">
              <div className="nav__sidebar-item">
                <div className="nav__sidebar-group" onClick={() => {
                  setCurrentMenu('all');
                  window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
                }}>
                  <img className="nav__sidebar-icon" src="/images/menu-icons/all-games.png" alt=""/>
                  <span className="nav__sidebar-label">All Games</span>
                </div>
              </div>
              <div className="nav__sidebar-item">
                <div className="nav__sidebar-group" onClick={() => {
                  setCurrentMenu('slot');
                  window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
                }}>
                  <img className="nav__sidebar-icon" src="/images/menu-icons/slots.png" alt=""/>
                  <span className="nav__sidebar-label">Slot Games</span>
                </div>
              </div>
              <div className="nav__sidebar-item">
                <div className="nav__sidebar-group" onClick={() => {
                  setCurrentMenu('live');
                  window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
                }}>
                  <img className="nav__sidebar-icon" src="/images/menu-icons/live-casino.png" alt=""/>
                  <span className="nav__sidebar-label">Live Casino</span>
                </div>
              </div>
              <div className="nav__sidebar-item">
                <div className="nav__sidebar-group" onClick={() => {
                  setCurrentMenu('progressive');
                  window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
                }}>
                  <img className="nav__sidebar-icon" src="/images/menu-icons/video-poker.png" alt=""/>
                  <span className="nav__sidebar-label">Progressive Games</span>
                </div>
              </div>
            </div>
            <form onSubmit={(ev) => submitSearch(ev)}>
              <div className="nav__sidebar__filter">
                <div className="nav__sidebar__filter__search-wrapper">
                  <input
                    value={search}
                    onChange={(ev) => setSearch(ev.target.value)}
                    type="text" placeholder="Search Game...."/>
                  <span className="nav__sidebar__filter__search-wrapper--icon">
                    <img src="/images/icons/search.png"/>
                </span>
                </div>
              </div>
            </form>
          </div>
        </div>

      </nav>
    </React.Fragment>
  )
    ;
};
