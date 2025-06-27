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
import {useTranslation} from "react-i18next";

const App = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [isShowModal, setIsShowModal] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
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

  const calloutLogin = (response) => {
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

  const handleLogout = () => {
    setUser({
      username: "",
      password: "",
    });
    setIsLogin(false);
    Cookies.remove("access_token");
    window.iapiLogout(1, 1);
    setIsShowLoginNotificationModal(false);
    setIsLogin(false);
  };

  useEffect(() => {
    window.iapiSetCallout("Login", calloutLogin);
    window.iapiSetCallout("GetLoggedInPlayer", calloutGetLoggedInPlayer);
    window.iapiSetCallout("Logout", calloutLogout);
    window.iapiGetLoggedInPlayer(1);
    
    const socket = new WebSocket(import.meta.env.VITE_WS_URL);

    socket.onopen = function (event) {
      console.log('You are Connected to WebSocket Server');
    };

    socket.onmessage = function (event) {
      console.log('event', event.data);
      if (event.data === user.username) {
        handleLogout();
      }
    };

    socket.onclose = function (event) {
      console.log('Disconnected from WebSocket server');
    };

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    (async () => {
      if (isLogin) {
        console.log("isLogin");
        pusherRef.current = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
          cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
        });
        const accessToken = Cookies.get("access_token");
        const extractedValues = await extractValuesFromToken(accessToken);
        if (!extractedValues) return;

        pusherRef.current.subscribe(PusherEventsEnum.NEW_SESSION);

        pusherRef.current.bind(
          extractedValues?.username,
          ({ access_token }) => {
            if (
              !!accessToken &&
              !!access_token &&
              accessToken !== access_token
            ) {
              handleLogout();
            }
          }
        );
      } else {
        pusherRef.current.unbind();
        pusherRef.current?.disconnect();
        pusherRef.current = undefined;
      }
    })();
  }, [isLogin]);

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
          <CarouselMobile />
        </div>
        <div className="d-none d-lg-block">
          <Carousel />
        </div>
        <JackpotWidget />
        <div className="position-relative overflow-hidden">
          <div className="bg-gradient-left"></div>
          <div className="bg-gradient-right"></div>
          {/* <div class="body-accent body-accent--ul"></div>
          <div class="body-accent body-accent--lr"></div> */}
          <div className="main-content">
            <div className="main-content__wrapper">
              <GamesContainer
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

if (document.getElementById("root")) {
  createRoot(document.getElementById("root")).render(<App />);
}
