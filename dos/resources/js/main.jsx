import "./i18n";
import React, { useEffect, useRef, useState } from "react";
import { Carousel } from "./components/Carousel";
import { CarouselMobile } from "./components/CarouselMobile";
import Cookies from "js-cookie";
import { Footer } from "./components/Footer";
import { GamesContainer } from "./components/GamesContainer";
import { Highlights } from "./components/Highlights.jsx";
import { JackpotWidget } from "./components/JackpotWidget.jsx";
import { LoginModal } from "./components/LoginModal";
import { LoginNotificationModal } from "./components/LoginNotificationModal";
import { NavBar } from "./components/NavBar";
import Pusher from "pusher-js";
import { PusherEventsEnum } from "../js/enums/Pusher.ts";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { createRoot } from "react-dom/client";
import { extractValuesFromToken } from "../js/utils";
import axios from "axios";
import {useTranslation} from "react-i18next";

const App = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [isShowModal, setIsShowModal] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [balance, setBalance] = useState(0);
  const [isShowLoginNotificationModal, setIsShowLoginNotificationModal] =
    useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [loginErrors, setLoginErrors] = useState({
    username: "",
    password: "",
    general: "",
  });
  const [currentMenu, setCurrentMenu] = useState("top");
  const [localSearch, setLocalSearch] = useState("");

  const { t } = useTranslation();
  const pusherRef = useRef("");

  const calloutLogin = async (response) => {
    try {
      const login = await axios.post('/api/auth/login', {
        username: user.username,
        password: user.password,
      });
      Cookies.set('auth_token', login.data.token);
    } catch (err) {
      console.log('err', err);
    } finally {

    }

    if (response.errorCode && response.errorCode === 48) {
      setLoginErrors({
        username: "",
        password: "",
        general: "Error code 48 encountered",
      });
      return;
    }

    if (response.errorCode && response.errorCode !== 48) {
      console.log("response.playerMessage", response.playerMessage);
      setLoginErrors({
        username: "",
        password: "",
        general: response.playerMessage,
      });
      return;
    }

    window.iapiSetCallout("GetLoggedInPlayer", calloutGetLoggedInPlayer);
    setIsLogin(true);
    setIsShowModal(false);
    setToastMessage(t('login-success-message'));
  };

  const calloutGetLoggedInPlayer = (response) => {
    console.log("calloutGetLoggedInPlayer: response", response);
    if (response.username) {
      setIsLogin(true);
      setUser({
        username: response.username,
        password: "",
      });
    }
  };

  const calloutLogout = (response) => {
    console.log("calloutLogout: response", response);
  };

  const handleLogout = async () => {
    setUser({
      username: "",
      password: "",
    });
    try {
      await axios.post("/api/auth/logout", {}, {
        headers: {
          Authorization: `Bearer ${Cookies.get('password')}`,
        },
      });
    } catch (err) {
      console.log('err', err);
    }
    setIsLogin(false);
    Cookies.remove("access_token");
    Cookies.remove('password');
    window.iapiLogout(1, 1);
    setIsShowLoginNotificationModal(false);
    setIsLogin(false);
  };

  useEffect(() => {
    window.iapiSetCallout("Login", calloutLogin);
    window.iapiSetCallout("GetLoggedInPlayer", calloutGetLoggedInPlayer);
    window.iapiSetCallout("Logout", calloutLogout);
    window.iapiGetLoggedInPlayer(1);
  }, []);

  useEffect(() => {
    console.log('user', user);
    let socket;
    const initSocket = () => {
      console.log('initSocket');
      if (!user.username) {
        return;
      }

      socket = new WebSocket(import.meta.env.VITE_WS_URL);

      socket.onopen = function (event) {
        console.log('You are Connected to WebSocket Server');
      };

      socket.onmessage = function (event) {
        console.log('event', event.data, user);
        if (event.data === user.username) {
          handleLogout();
        }
      };

      socket.onclose = function (event) {
        console.log('Disconnected from WebSocket server');
        setTimeout(() => {
          initSocket();
        }, 1000);
      };
    };

    initSocket();

    return () => {
      if (socket) {
        socket.close();
        socket = undefined;
      }
    };
  }, [user.username]);

  return (
    <>
      <NavBar
        balance={balance}
        setBalance={setBalance}
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
          <CarouselMobile />
        </div>
        <div className="d-none d-lg-block">
          <Carousel />
        </div>
        <JackpotWidget />
        <div className="position-relative overflow-hidden">
          {/* <div className="bg-gradient-left"></div>
          <div className="bg-gradient-right"></div> */}
          <div className="main-content">
            <div className="main-content__wrapper">
              <GamesContainer
                balance={balance}
                setBalance={setBalance}
                user={user}
                currentMenu={currentMenu}
                localSearch={localSearch}
                setLocalSearch={setLocalSearch}
                isLogin={isLogin}
                setIsShowLoginNotificationModal={
                  setIsShowLoginNotificationModal
                }
              />
              <Highlights setCurrentMenu={setCurrentMenu} />
            </div>
          </div>
        </div>

        <Footer />
        <LoginModal
          setIsLogin={setIsLogin}
          setUser={setUser}
          user={user}
          isShow={isShowModal}
          setIsShow={setIsShowModal}
          errors={loginErrors}
          setErrors={setLoginErrors}
        />
        <LoginNotificationModal
          setToastMessage={setToastMessage}
          isShow={isShowLoginNotificationModal}
          setIsShow={setIsShowLoginNotificationModal}
          setLoginShow={setIsShowModal}
        />
        <ToastContainer
          style={{ position: "fixed" }}
          position={"middle-center"}
          className="p-3"
        >
          <Toast
            onClose={() => setToastMessage("")}
            show={toastMessage}
            bg={"light"}
            delay={2000}
            autohide
            className="notification"
          >
            <Toast.Body className="notification__body">
              <div className="notification__info info">
                <img src="/images/login-modal.png" />
                <span className="info__label">{toastMessage}</span>
              </div>
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    </>
  );
};

if (document.getElementById("root")) {
  createRoot(document.getElementById("root")).render(<App />);
}
