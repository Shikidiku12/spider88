import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GameFilter } from './GameFilter';
import { GameFilterMobile } from './GameFilterMobile';
import { GamesList } from './GamesList';
import { Filters } from '../enums/Filters';

export const GamesContainer = ({
  user,
  isLogin,
  setIsShowLoginNotificationModal,
  currentMenu,
  localSearch
}) => {
  // TODO: Use enums instead of strings
  //const [filter, setFilter] = useState<Filters>(Filters.ALL);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
    setFilter(currentMenu);
    setSearch(localSearch);

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

    setFilteredGames(games.filter(game => {
      return game.name.toLowerCase().includes(search.toLowerCase());
    }));
  }, [filter, search, currentMenu, localSearch]);

  useEffect(() => {
    const init = async () => {
      try {
        const response = await axios.get('/api/game');
        setGames(response.data.map(game => {
          game.isHover = false;
          return game;
        }));
        setGames(response.data);
        setFilteredGames(response.data);
      } catch (err) {
        console.log('err', err);
      } finally {

      }
    };
    init();
  }, []);

  return (
    <div className="main-content">
      <div className="main-content__wrapper">
        <div className="provider-section">
          <div className="provider-section__title">
            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item breadcrumbs__item--current">
                  <span className={`breadcrumbs__icon breadcrumbs__icon--${filter}`}></span>
                  <span className="breadcrumbs__current">{filter.charAt(0).toUpperCase() + filter.slice(1)} Games</span>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        { !isLoading &&
          <GamesList
            setIsShowLoginNotificationModal={setIsShowLoginNotificationModal}
            games={filteredGames}
            setGames={setFilteredGames}
            user={user}
            isLogin={isLogin}
          />
        }
      </div>

    </div>
  )
    ;
};
