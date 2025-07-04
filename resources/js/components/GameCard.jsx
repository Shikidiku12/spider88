import '../../sass/components/game-card.scss';
import {useTranslation} from "react-i18next";

export const GameCard = ({ game, launchActualGame, launchDemoGame }) => {

  const { t } = useTranslation();

  const fetchImageName = (game) => {
    return game.is_live ? game.alias : game.code;
  };

  return (
    <div className="game">
      <div className="game__wrapper">
        <div className="game__image-wrapper ">
          <img
            className="game__image"
            alt={game.name}
            src={`/images/games_icons_desktop/${fetchImageName(game)}.jpg`}
          />
        </div>
        <div className="game__overlay">
          <span className="game__overlay-title">{game.name}</span>
          <div className="d-flex justify-content-center flex-column">
            <button
              type="button" className="game__overlay-btn-play"
              onClick={(ev) => launchActualGame(ev, game)}
            >
              {t('play')}
            </button>

            {/*{!game.is_live &&*/}
            {/*  <button*/}
            {/*    type="button" className="game__overlay-btn-demo"*/}
            {/*    onClick={(ev) => launchDemoGame(ev, game)}*/}
            {/*  >Demo</button>*/}
            {/*}*/}
          </div>
        </div>
      </div>
    </div>
  )
};
