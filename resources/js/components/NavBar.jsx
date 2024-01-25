import React, {useEffect, useState} from 'react';
import Cookies from 'js-cookie';

export const NavBar = ({ setIsShowModal, setIsLogin, setUser, isLogin, setToastMessage, setCurrentMenu }) => {
  const [isOpen, setIsOpen] = useState(false)

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
    window.addEventListener("resize", handleResize)
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
              <div className="nav__divider"></div>
              <div className="d-flex nav__actions">
                <div className="nav__login" id="login">
                  <button className="nav__login--btn" onClick={() =>setIsShowModal(true)}>Login</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="nav__contents d-flex">
            <div className="nav__sidebar main-content">
              <div className="nav__sidebar-list main-content__wrapper">
                <div className="nav__sidebar-item">
                  <div className="nav__sidebar-group" onClick={() => setCurrentMenu('all')}>
                    <img className="nav__sidebar-icon" src="/images/menu-icons/all-games.png" alt=""/>
                    <span className="nav__sidebar-label">All Games</span>
                  </div>
                </div>
                <div className="nav__sidebar-item">
                  <div className="nav__sidebar-group"  onClick={() => setCurrentMenu('slot')}>
                    <img className="nav__sidebar-icon" src="/images/menu-icons/slots.png" alt=""/>
                    <span className="nav__sidebar-label">Slot Games</span>
                  </div>
                </div>
                <div className="nav__sidebar-item">
                  <div className="nav__sidebar-group"  onClick={() => setCurrentMenu('live')}>
                    <img className="nav__sidebar-icon" src="/images/menu-icons/live-casino.png" alt=""/>
                    <span className="nav__sidebar-label">Live Casino</span>
                  </div>
                </div>
                <div className="nav__sidebar-item">
                  <div className="nav__sidebar-group"  onClick={() => setCurrentMenu('progressive')}>
                    <img className="nav__sidebar-icon" src="/images/menu-icons/video-poker.png" alt=""/>
                    <span className="nav__sidebar-label">Progressive Games</span>
                  </div>
                </div>
              </div>
            </div>
        </div>

      </nav>
    </React.Fragment>
  )
    ;
};
