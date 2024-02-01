import "../../sass/components/game-list.scss";

import Cookies from "js-cookie";
import { GameCard } from "@/components/GameCard.jsx";
import React from "react";
import { extractValuesFromToken } from "../utils";
import { useState } from "react";

export const GamesList = ({
  filter,
  user,
  isLogin,
  games,
  setGames,
  setIsShowLoginNotificationModal,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [numberOfGame, setNumberOfGame] = useState(21);
  const [maxGame, setMaxGame] = useState(21);

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
  }

  const launchActualGame = async (ev, game) => {
    if (!isLogin) {
      setIsShowLoginNotificationModal(true);
      return;
    }

    const username = prependSpider88(user.username);

    window.iapiLoginAndGetTempToken(
      username,
      Cookies.get('password'),
      language,
      languageCode
    );

    const extractedValues = await extractValuesFromToken(
      Cookies.get("access_token")
    );

    if (!extractedValues) throw new Error("Invalid token");

    try {
      window.iapiLoginAndGetTempToken(
        user.username,
        extractedValues.password,
        language,
        languageCode
      );

      const queryParams = {
        casinoname: "flyingdragon88",
        realMode: "EN",
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
      formData.append('password', extractedValues?.password);

      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const body = await response.json();

      const sessionToken = body.sessionToken.sessionToken;

      const gameLaunchParams = {
        gameCodeName: game.is_live ? game.code + ';' + game.alias : game.code,
        username: username,
        tempToken: sessionToken,
        casino: "flyingdragon88",
        clientPlatform: "web",
        language: "EN",
        playMode: 1,
        depositUrl:
          "https://google.com&lobbyUrl=https://tools.ptdev.eu/cpsg/kade/technicalerror.html",
      };
      const gameLaunchUrl =
        "https://login.flyingdragon88.com/GameLauncher?" +
        objectToQueryString(gameLaunchParams);
      popUp(gameLaunchUrl, "", 900, 800);
      //window.open(gameLaunchUrl);
    } catch (err) {
      console.log("err", err);
    } finally {
    }
  };

  const onMouseOver = (ev, game) => {
    const updatedGames = [...games];
    const updatedGame = updatedGames.find(
      (updatedGame) => updatedGame.id === game.id
    );
    updatedGame.isHover = true;
    updatedGames.game = updatedGame;
    setGames(updatedGames);
  };

  const onMouseOut = (ev, game) => {
    const updatedGames = [...games];
    const updatedGame = updatedGames.find(
      (updatedGame) => updatedGame.id === game.id
    );
    updatedGame.isHover = false;
    updatedGames.game = updatedGame;
    setGames(updatedGames);
  };

  const fetchImageName = (game) => {
    return game.is_live ? game.alias : game.code;
  };

  const loadMore = () => {
    const newNumberOfGame = numberOfGame + maxGame;
    setNumberOfGame(newNumberOfGame);
  };

  const popUp = (url, title, w, h) => {
    const dualScreenLeft =
      window.screenLeft !== undefined ? window.screenLeft : 0;
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : 0;
    let width = 0;
    let height = 0;

    width = window.innerWidth
      ? window.innerWidth
      : document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : screen.width;
    height = window.innerHeight
      ? window.innerHeight
      : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : screen.height;

    const left = width / 2 - w / 2 + dualScreenLeft;
    const top = height / 2 - h / 2 + dualScreenTop;
    const newWindow = window.open(
      url,
      title,
      "scrollbars=yes, width=" +
        w +
        ", height=" +
        h +
        ", top=" +
        top +
        ", left=" +
        left
    );

    newWindow.focus();
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
