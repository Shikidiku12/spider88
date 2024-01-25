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
  currentMenu
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
  }, [filter, search, currentMenu]);

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
        <div className=" row d-lg-none">
          <div className="col">
            <h2>
              {filter.charAt(0).toUpperCase() + filter.slice(1)} Games
            </h2>
          </div>
          <div className="col">
            <div className="input-group">
              <input
                value={search}
                onChange={(ev) => setSearch(ev.target.value)}
                placeholder="Search Game ..."
                type="text"
                className="text-dark form-control form-control-sm bg-light placeholder-dark border-0"
              />
              <span className="input-group-text bg-light border-0">
              <img src="/images/search_icon.svg"/>
            </span>
            </div>
          </div>
        </div>

        {!isLoading &&
          <GamesList
            setIsShowLoginNotificationModal={setIsShowLoginNotificationModal}
            games={filteredGames}
            setGames={setFilteredGames}
            user={user}
            isLogin={isLogin}
          />
        }
        <GameFilterMobile
          setSearch={setSearch}
          search={search}
          setFilter={setFilter}
          filter={filter}
        />
      </div>
    </div>

    // <div className="main-content">
    //   <div className="main-content__wrapper">
    //     <div className="provider-section">
    //       <div className="provider-section__title">
    //         <nav className="breadcrumbs">
    //           <ul className="breadcrumbs__list">
    //             <li className="breadcrumbs__item breadcrumbs__item--current">
    //               <span className={`breadcrumbs__icon breadcrumbs__icon`}></span>
    //               <span className="breadcrumbs__current">{filter.charAt(0).toUpperCase() + filter.slice(1)} Games</span>
    //             </li>
    //           </ul>
    //         </nav>
    //       </div>
    //     </div>
    //   </div>
    //
    // </div>
  )
    ;
};
