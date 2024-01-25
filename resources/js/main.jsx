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
  const [currentMenu, setCurrentMenu] = useState('');

  const calloutLogin = (response) => {
    console.log('response', response);
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
    <div>
      <NavBar
        setToastMessage={setToastMessage}
        setIsShowModal={setIsShowModal}
        setUser={setUser}
        setIsLogin={setIsLogin}
        isLogin={isLogin}
        setCurrentMenu={setCurrentMenu}
      />
      <div className="main">
        <div className="d-lg-none">
          <CarouselMobile/>
        </div>
        <div className="d-none d-lg-block">
          <Carousel/>
        </div>
        <div className="main-content">
          <JackpotWidget/>
        </div>
        <GamesContainer
          user={user}
          currentMenu={currentMenu}
          isLogin={isLogin}
          setIsShowLoginNotificationModal={setIsShowLoginNotificationModal}
        />
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
        <ToastContainer style={{position: 'fixed'}} position={'middle-center'}>
          <Toast
            onClose={() => setToastMessage('')}
            show={toastMessage}
            bg={'dark'}
            delay={5000}
            autohide
          >
            <Toast.Header closeButton={true} bsPrefix={"headerNotification"}>
            </Toast.Header>
            <Toast.Body>
                <h3>{toastMessage}</h3>
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    </div>
  );
};

if (document.getElementById('root')) {
    createRoot(document.getElementById('root')).render(<App/>);
}
