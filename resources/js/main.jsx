import React, { useEffect, useRef, useState } from "react";

import { Carousel } from "./components/Carousel";
import { CarouselMobile } from "./components/CarouselMobile";
import Cookies from "js-cookie";
import { DuplicateSessionModal } from "./components/DuplicateSessionModal.jsx";
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
  const [showDuplicateSession, setShowDuplicateSession] = useState(false);

  Pusher.logToConsole = true;
  const pusherRef = useRef("");
  const channelRef = useRef();

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
    setIsLogin(true);
    setIsShowModal(false);
    setToastMessage("You have successfully logged in!");
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

  useEffect(() => {
    window.iapiSetCallout("Login", calloutLogin);
    window.iapiSetCallout("GetLoggedInPlayer", calloutGetLoggedInPlayer);
    window.iapiSetCallout("Logout", calloutLogout);
    window.iapiGetLoggedInPlayer(1);
  }, []);

  console.log("key", import.meta.env.VITE_PUSHER_APP_KEY);
  useEffect(() => {
    (async () => {
      if (isLogin) {
        console.log("isLogin");
        pusherRef.current = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
          cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
        });
        const extractedValues = await extractValuesFromToken(
          Cookies.get("access_token")
        );
        console.log("extractedValues  main", extractedValues);
        // if (!extractedValues) throw new Error("Invalid token");
        // pusherRef.current.signin();
        channelRef.current = pusherRef.current.subscribe("pusher-channel");

        pusherRef.current.bind(extractedValues.username, ({ access_token }) => {
          if (Cookies.get("access_token") !== access_token) {
            setIsShowModal(false);
            setIsShowLoginNotificationModal(false);
            setShowDuplicateSession(true);
          }

          // Handle the data as needed
        });

        // channelRef.current.bind(
        //   `App\\Events\\${extractedValues.username}`,
        //   (data) => {
        //     console.log("Data Received event:", data);
        //     // Handle the data as needed
        //   }
        // );

        // channelRef.current.bind("pusher:subscription_succeeded", () => {
        //   const triggered = channelRef.current.trigger("client-someEventName", {
        //     your: "data",
        //   });
        // });

        // pusherRef.current.bind("client-someEventName", (val) => {
        //   console.log("event trigger", val);
        // });
      }
      // else {
      //   pusherRef.current?.disconnect();
      //   pusherRef.current = undefined;
      //   channel = null
      // }
    })();
  }, [isLogin]);

  return (
    <>
      <NavBar
        setToastMessage={setToastMessage}
        setIsShowModal={setIsShowModal}
        setUser={setUser}
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

        <Footer />
        <LoginModal
          setUser={setUser}
          user={user}
          isShow={isShowModal}
          setIsShow={setIsShowModal}
          errors={loginErrors}
        />
        <DuplicateSessionModal
          isShow={showDuplicateSession}
          setIsShow={setShowDuplicateSession}
          setLoginShow={setIsShowModal}
        />
        <LoginNotificationModal
          setToastMessage={setToastMessage}
          isShow={isShowLoginNotificationModal}
          setIsShow={setIsShowLoginNotificationModal}
          setLoginShow={setIsShowModal}
        />
        <ToastContainer
          style={{ position: "fixed" }}
          position={window.innerWidth < 768 ? "middle-center" : "top-center"}
          className="p-3"
        >
          <Toast
            onClose={() => setToastMessage("")}
            show={toastMessage}
            bg={"success"}
            delay={3000}
            autohide
          >
            <Toast.Body>{toastMessage}</Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    </>
  );
};

if (document.getElementById("root")) {
  createRoot(document.getElementById("root")).render(<App />);
}
