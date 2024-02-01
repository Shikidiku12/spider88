import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

import { NavBar } from './components/NavBar';
import { Carousel } from './components/Carousel';
import { CarouselMobile } from './components/CarouselMobile';
import { DemoMarquee } from './components/DemoMarquee';
import { GamesContainer } from './components/GamesContainer';
import { Footer } from './components/Footer';
import { LoginModal } from './components/LoginModal';
import { LoginNotificationModal } from './components/LoginNotificationModal';
import {JackpotWidget} from "./components/JackpotWidget.jsx";
import {Highlights} from "./components/Highlights.jsx";

import './i18n';

const App = () => {
  const [user, setUser] = useState({
    username: '',
    password: ''
  });
  const [isShowModal, setIsShowModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isShowLoginNotificationModal, setIsShowLoginNotificationModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [loginErrors, setLoginErrors] = useState({
    username: '',
    password: '',
    general: ''
  });
  const [currentMenu, setCurrentMenu] = useState('top');
  const [localSearch, setLocalSearch] = useState('');

  const calloutLogin = (response) => {
    if (response.errorCode && response.errorCode === 48) {
      setLoginErrors({
        username: '',
        password: '',
        general: 'Error code 48 encountered'
      });
      return;
    }

    if (response.errorCode && response.errorCode !== 48) {
      console.log('response.playerMessage', response.playerMessage);
      setLoginErrors({
        username: '',
        password: '',
        general: response.playerMessage
      });
      return;
    }

    window.iapiSetCallout('GetLoggedInPlayer', calloutGetLoggedInPlayer);
    setIsLogin(true);
    setIsShowModal(false);
    setToastMessage("You have successfully logged in!");
  };

  const calloutGetLoggedInPlayer = (response) => {
    console.log('calloutGetLoggedInPlayer: response', response);
    if (response.username) {
      setIsLogin(true);
      setUser({
        username: response.username,
        password: ''
      });
    }
  };

  const calloutLogout = (response) => {
    console.log('calloutLogout: response', response);
  };

  useEffect(() => {
    window.iapiSetCallout('Login', calloutLogin);
    window.iapiSetCallout('GetLoggedInPlayer', calloutGetLoggedInPlayer);
    window.iapiSetCallout('Logout', calloutLogout);
    window.iapiGetLoggedInPlayer(1);
  }, []);

  return (
    <>
      <NavBar
        setToastMessage={setToastMessage}
        setIsShowModal={setIsShowModal}
        setUser={setUser}
        user={user}
        setIsLogin={setIsLogin}
        isLogin={isLogin}
        currentMenu={currentMenu}
        setCurrentMenu={setCurrentMenu}
        setLocalSearch={setLocalSearch}
      />

      <div className="main">
        <div className="d-lg-none">
          <CarouselMobile/>
        </div>
          <div className="d-none d-lg-block">
          <Carousel/>
        </div>
        <JackpotWidget/>
        <div className="position-relative overflow-hidden">
          <div className="bg-gradient-left"></div>
          <div className="bg-gradient-right"></div>
          <div className="main-content">
            <div className="main-content__wrapper">
              <GamesContainer
                user={user}
                currentMenu={currentMenu}
                localSearch={localSearch}
                setLocalSearch={setLocalSearch}
                isLogin={isLogin}
                setIsShowLoginNotificationModal={setIsShowLoginNotificationModal}
              />
              <Highlights
                setCurrentMenu={setCurrentMenu}
              />
            </div>
          </div>
        </div>

        <Footer/>
        <LoginModal
          setUser={setUser}
          user={user}
          isShow={isShowModal}
          setIsShow={setIsShowModal}
          errors={loginErrors}
        />
        <LoginNotificationModal
          setToastMessage={setToastMessage}
          isShow={isShowLoginNotificationModal}
          setIsShow={setIsShowLoginNotificationModal}
          setLoginShow={setIsShowModal}
        />
        <ToastContainer style={{position: 'fixed'}} position={'middle-center'}
                        className="p-3">
          <Toast
            onClose={() => setToastMessage('')}
            show={toastMessage}
            bg={'light'}
            delay={2000}
            autohide
            className="notification"
          >
            <Toast.Body className="notification__body">
              <div className="notification__info info">
                <img src="/images/login_success.svg" />
                <span className="info__label">{toastMessage}</span>
              </div>
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    </>
  );
};

if (document.getElementById('root')) {
  createRoot(document.getElementById('root')).render(<App/>);
}
