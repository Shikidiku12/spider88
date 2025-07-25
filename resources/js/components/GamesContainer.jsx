import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GameFilter } from './GameFilter';
import { GameFilterMobile } from './GameFilterMobile';
import { GamesList } from './GamesList';
import { Filters } from '../enums/Filters';
import '../../sass/components/game-container.scss';
import {GameDialog} from "../components/GameDialog.jsx";
import {useTranslation} from "react-i18next";

export const GamesContainer = ({
  user,
  isLogin,
  setIsShowLoginNotificationModal,
  currentMenu,
  localSearch,
  setLocalSearch,
}) => {
  // TODO: Use enums instead of strings
  //const [filter, setFilter] = useState<Filters>(Filters.ALL);
  const [filter, setFilter] = useState('top');
  const [search, setSearch] = useState('');
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowGameModal, setIsShowGameModal] = useState(false);
  const [gameURL, setGameURL] = useState('');

  const { t } = useTranslation();

  const submitSearch = (ev) => {
    ev.preventDefault();
    setSearch(search);
  };

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
  }

  const filterGames = (filter) => {
    if (filter === 'slot') {
      setFilteredGames(games.filter(game => {
        return !game.is_live && game.name.toLowerCase().includes(search.toLowerCase());
      }));
      return;
    }

    if (filter === 'progressive') {
      setFilteredGames(games.filter(game => {
        return game.is_progressive && game.name.toLowerCase().includes(search.toLowerCase());
      }));
      return;
    }

    if (filter === 'live') {
      setFilteredGames(games.filter(game => {
        return game.is_live && game.name.toLowerCase().includes(search.toLowerCase());
      }));
      return;
    }

    if (filter === 'top') {

      const codesToFilter = [
        'arc', 'gpas_bwizard_pop',
        'bib', 'hk', 'dnr',
        'gos', 'bfb',
        'ct', 'gpas_elady_pop',
        'gpas_mgbwizard_pop', 'sfh',
        'longlong', 'gpas_rempress_pop',
        'epa'
      ];

      setFilteredGames(games.filter(game => {
        return codesToFilter.includes(game.code) && game.name.toLowerCase().includes(search.toLowerCase());
      }));
      return;
    }

    setFilteredGames(games.filter(game => {
      return game.name.toLowerCase().includes(search.toLowerCase());
    }));
  }

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
    setFilter(currentMenu);

    filterGames(filter);

  }, [games, filter, search, currentMenu, localSearch]);

  useEffect(() => {
    const init = async () => {
      try {
        const response = await axios.get('/api/game');
        setGames(response.data.map(game => {
          game.isHover = false;
          return game;
        }));
        setGames(response.data);
      } catch (err) {
        console.log('err', err);
      } finally {

      }
    };
    init();
  }, []);

  return (
    <>
      <div id="game-list-section" className="provider-section">
        <div className="provider-section__title">
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item breadcrumbs__item--current">
                <span className={`breadcrumbs__icon breadcrumbs__icon--${filter}`}></span>
                <span className="breadcrumbs__label">{t(filter)} {t('games')}</span>
              </li>
            </ul>
          </nav>
        </div>

        <div className="provider-section__filter">
          <form
            className="w-100"
            onSubmit={(ev) => submitSearch(ev)}
          >
            <div className="provider-section__filter">
              <div className="provider-section__filter__search-wrapper">
                <input
                  value={search}
                  onChange={handleInputChange}
                  type="text" placeholder={t('search-games')}/>
                <span className="provider-section__filter__search-wrapper--icon">
                      <img src="/images/spider/Icons/search.png"/>
                    </span>
              </div>
            </div>
          </form>
        </div>
      </div>
      {!isLoading &&
        <GamesList
          setIsShowLoginNotificationModal={setIsShowLoginNotificationModal}
          games={filteredGames}
          setGames={setFilteredGames}
          user={user}
          isLogin={isLogin}
          setIsShowGameModal={setIsShowGameModal}
          setGameURL={setGameURL}
        />
      }

      <GameDialog
        isShow={isShowGameModal}
        gameURL={gameURL}
        setIsShow={setIsShowGameModal}
      ></GameDialog>
    </>
  )
    ;
};
