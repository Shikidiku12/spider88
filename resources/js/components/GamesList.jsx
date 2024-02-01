import "../../sass/components/game-list.scss";

import React, { useState } from "react";

import Cookies from "js-cookie";
import { GameCard } from "../components/GameCard.jsx";
import { extractValuesFromToken } from "../utils";
import { useTranslation } from "react-i18next";

export const GamesList = ({
  filter,
  user,
  isLogin,
  games,
  setGames,
  setIsShowLoginNotificationModal,
  setIsShowGameModal,
  setGameURL,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [numberOfGame, setNumberOfGame] = useState(21);
  const [maxGame, setMaxGame] = useState(21);

  const { t, i18n } = useTranslation();

  const language = "English";
  const languageCode = "EN";

  const objectToQueryString = (obj) => {
    const keys = Object.keys(obj);
    const keyValuePairs = keys.map((key) => {
      return encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]);
    });
    return keyValuePairs.join("&");
  };

  const launchDemoGame = (ev, game) => {
    window.iapiSetClientParams("ngm_desktop", "language=" + "en" + "&real=0");
    window.iapiLaunchClient("ngm_desktop", game.code, "offline", "_blank");
  };

  const prependSpider88 = (username) => {
    // Check if the variable contains "SPIDER88_"
    if (!username.includes("SPIDER88_")) {
      // If not, prepend "SPIDER88_"
      username = "SPIDER88_" + username;
    }

    return username;
  };

  const convertLanguageCode = (langCode) => {
    const language = {
      en: "EN",
      zh: "ZH-CN",
      ms: "MS",
    };

    return language[langCode] ?? "EN";
  };

  const launchActualGame = async (ev, game) => {
    if (!isLogin) {
      setIsShowLoginNotificationModal(true);
      return;
    }
    const extractedValues = await extractValuesFromToken(
      Cookies.get("access_token")
    );
    if (!extractedValues) throw new Error("Invalid token");

    const username = prependSpider88(user.username);
    const langCode = convertLanguageCode(i18n.language);

    try {
      window.iapiLoginAndGetTempToken(
        username,
        extractedValues.password,
        language,
        langCode
      );

      const queryParams = {
        casinoname: "flyingdragon88",
        realMode: langCode,
        serviceType: "GamePlay",
        systemId: 77,
        clientType: "casino",
        clientPlatform: "web",
        clientSkin: "flyingdragon88",
        languageCode: "LoginService",
      };

      const url =
        "https://login.flyingdragon88.com/LoginAndGetTempToken.php?" +
        objectToQueryString(queryParams);

      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", extractedValues?.password);

      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const body = await response.json();

      const sessionToken = body.sessionToken.sessionToken;

      const gameLaunchParams = {
        gameCodeName: game.is_live ? game.code + ";" + game.alias : game.code,
        username: username,
        tempToken: sessionToken,
        casino: "flyingdragon88",
        clientPlatform: window.innerWidth < 768 ? "mobile" : "web",
        language: langCode,
        playMode: 1,
        depositUrl:
          "https://google.com&lobbyUrl=https://tools.ptdev.eu/cpsg/kade/technicalerror.html",
      };
      const gameLaunchUrl =
        "https://login.flyingdragon88.com/GameLauncher?" +
        objectToQueryString(gameLaunchParams);

      setGameURL(gameLaunchUrl);
      setIsShowGameModal(true);
    } catch (err) {
      console.log("err", err);
    } finally {
    }
  };

  const loadMore = () => {
    const newNumberOfGame = numberOfGame + maxGame;
    setNumberOfGame(newNumberOfGame);
  };

  return (
    <React.Fragment>
      <div className="game-list">
        {games.slice(0, numberOfGame).map((game, index) => {
          return (
            <GameCard
              key={game.id}
              game={game}
              launchDemoGame={launchDemoGame}
              launchActualGame={launchActualGame}
            ></GameCard>
          );
        })}
      </div>
      {games.length > numberOfGame && (
        <div className="d-flex justify-content-center align-items-center">
          <button
            type="button"
            className="game-list__button"
            onClick={() => loadMore()}
          >
            Load More
          </button>
        </div>
      )}

      {games.length === 0 && (
        <div className="no-games-found">No games found.</div>
      )}
    </React.Fragment>
  );
};
