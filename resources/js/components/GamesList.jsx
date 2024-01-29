import axios from 'axios';
import Cookies from 'js-cookie';
import React from 'react';
import { useEffect, useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

export const GamesList = ({
  filter,
  user,
  isLogin,
  games,
  setGames,
  setIsShowLoginNotificationModal
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [numberOfGame, setNumberOfGame] = useState(18);
  const [maxGame, setMaxGame] = useState(18);

  const language = 'English';
  const languageCode = 'EN';

  const objectToQueryString = (obj) => {
    const keys = Object.keys(obj);
    const keyValuePairs = keys.map(key => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
    });
    return keyValuePairs.join('&');
  };

  const launchDemoGame = (ev, game) => {
    window.iapiSetClientParams('ngm_desktop', 'language=' + 'en' + '&real=0');
    window.iapiLaunchClient('ngm_desktop', game.code, 'offline', '_blank');
  };

  // Function to extract values from the access token
  const extractValuesFromToken = async (token) => {
    try {
      console.log(`extracting values from token : ${token}`)
      // Send the token to the backend for extraction (optional)
      // Alternatively, you can extract values directly on the frontend if needed
      const { data } = await axios.post('/extract-values-from-token', { token });
      return data;
    } catch (error) {
      console.error('Error extracting values from token:', error);
      return null;
    }
  };

  const launchActualGame = async (ev, game) => {
    if (!isLogin) {
      setIsShowLoginNotificationModal(true);
      return;
    }

    window.iapiLoginAndGetTempToken(
      user.username,
      Cookies.get('password'),
      language,
      languageCode
    );

    const queryParams = {
      casinoname: 'flyingdragon88',
      realMode: 'EN',
      serviceType: 'GamePlay',
      systemId: 77,
      clientType: 'casino',
      clientPlatform: 'web',
      clientSkin: 'flyingdragon88',
      languageCode: 'LoginService',
    };

    const url = 'https://login.flyingdragon88.com/LoginAndGetTempToken.php?'
      + objectToQueryString(queryParams);


    try {
      const extractedValues = await extractValuesFromToken(Cookies.get('access_token'));
      console.log('values', extractedValues)
      if (!extractedValues) throw new Error('Invalid token');

      const formData = new FormData();
      formData.append("username", `SPIDER88_${user.username}`);
      formData.append('password', extractedValues?.password);

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });
      const body = await response.json();

      console.log(body);

      const sessionToken = body.sessionToken.sessionToken;

      const gameLaunchParams = {
        gameCodeName: game.is_live ? game.code + ';' + game.alias : game.code,
        username: `SPIDER88_${user.username}`,
        tempToken: sessionToken,
        casino: 'flyingdragon88',
        clientPlatform: 'web',
        language: 'EN',
        playMode: 1,
        depositUrl: 'https://google.com&lobbyUrl=https://tools.ptdev.eu/cpsg/kade/technicalerror.html'
      };
      const gameLaunchUrl = 'https://login.flyingdragon88.com/GameLauncher?'
        + objectToQueryString(gameLaunchParams);
      popUp(gameLaunchUrl, '', 900, 800);
      //window.open(gameLaunchUrl);
    } catch (err) {
      console.log('err', err);
    } finally {

    }
  };

  const onMouseOver = (ev, game) => {
    const updatedGames = [...games];
    const updatedGame = updatedGames.find(updatedGame => updatedGame.id === game.id);
    updatedGame.isHover = true;
    updatedGames.game = updatedGame;
    setGames(updatedGames)
  };

  const onMouseOut = (ev, game) => {
    const updatedGames = [...games];
    const updatedGame = updatedGames.find(updatedGame => updatedGame.id === game.id);
    updatedGame.isHover = false;
    updatedGames.game = updatedGame;
    setGames(updatedGames)
  };

  const fetchImageName = (game) => {
    return game.is_live ? game.alias : game.code;
  };

  const loadMore = () => {
    const newNumberOfGame = numberOfGame + maxGame;
    setNumberOfGame(newNumberOfGame);
  }

  const popUp = (url, title, w, h) => {
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : 0;
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : 0;
    let width = 0;
    let height = 0;

    width = window.innerWidth ? window.innerWidth :
      document.documentElement.clientWidth ?
        document.documentElement.clientWidth : screen.width;
    height = window.innerHeight ? window.innerHeight :
      document.documentElement.clientHeight ?
        document.documentElement.clientHeight : screen.height;

    const left = ((width / 2) - (w / 2)) + dualScreenLeft;
    const top = ((height / 2) - (h / 2)) + dualScreenTop;
    const newWindow = window.open(url, title,
      'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);


    newWindow.focus();


  }

  return (
    <React.Fragment>
      <div className="game-list">
        <div className="row">
          {
            games.slice(0, numberOfGame).map((game, index) => {
              return (
                <div
                  key={game.id}
                  className="px-4 col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 mb-4"
                  onMouseOver={(ev) => onMouseOver(ev, game)}
                  onMouseOut={(ev) => onMouseOut(ev, game)}
                >
                  <div className="image-wrapper d-flex justify-content-center">
                    <img
                      alt={game.name}
                      src={`/images/games_icons_desktop/${fetchImageName(game)}.jpg`}
                      className="rounded img-fluid"
                    />
                    <div className={`overlay mb-3 ${game.isHover ? '' : 'd-none'}`}>
                      <div className="d-sm-flex d-lg-none flex-column px-5">
                        <button
                          type="button"
                          onClick={(ev) => launchActualGame(ev, game)}
                          className="btn-game w-auto flex-fill py-3 mb-3"
                        >
                          Play
                        </button>
                        {!game.is_live &&
                          <button
                            type="button"
                            onClick={(ev) => launchDemoGame(ev, game)}
                            className="btn-game w-auto flex-fill py-3 mb-3"
                          >
                            Demo
                          </button>
                        }
                      </div>
                      <div className="d-lg-flex justify-content-evenly d-none">
                        <button
                          type="button"
                          onClick={(ev) => launchActualGame(ev, game)}
                          className="btn-game"
                        >
                          Play
                        </button>
                        {!game.is_live &&
                          <button
                            type="button"
                            onClick={(ev) => launchDemoGame(ev, game)}
                            className="btn-game"
                          >
                            Demo
                          </button>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          }
        </div>
        {
          games.length > numberOfGame &&
          <div className="d-flex justify-content-center align-items-center">
            <button type="button" className="game-list__button" onClick={() => loadMore()}>Load More</button>
          </div>
        }
      </div>
    </React.Fragment>
  );
};
