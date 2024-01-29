import React, {useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import axios from "axios";

export const NavBar = ({ setIsShowModal, setIsLogin, setUser, isLogin, setToastMessage, currentMenu, setCurrentMenu, setLocalSearch }) => {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768);
  const [search, setSearch] = useState('');
  const [balance, setBalance] = useState(0);
  const [sidebarContent, setSidebarContent] = useState('categories');

  const submitSearch = (ev) => {
    ev.preventDefault();
    setLocalSearch(search);
  };

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
    setLocalSearch(search);
  }

  const logout = () => {
    setUser({
      username: '',
      password: ''
    });
    setIsLogin(false);
    Cookies.remove('password');
    setToastMessage('You have successfully logged out!');
    window.iapiLogout(1, 1);
  };

  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }

  const openSidebar = (content) => {
    if (window.innerWidth < 768) {
      setIsOpen(!isOpen);
      setSidebarContent(content);
    }
  }

  useEffect(() => {

    window.addEventListener("resize", handleResize);
    window.addEventListener("click", (e) => {
      if(e.target.className.includes('nav__contents')) {
       setIsOpen(false);
      }
    });
  });

  useEffect(() => {
    const playerName = Cookies.get('pas[flyingdragon88][real][username]') ?? 'SPIDER88_TEST01';

    const init = async () => {
      try {
        const response = await axios.get('/api/get-balance/'+ playerName);
        setBalance(response.data.balance);
      } catch (err) {
        console.log('err', err);
      } finally {

      }
    };

   if(isLogin) {
     init();

     setInterval(() => {
       init();
     },15000);
   }

  },[isLogin])

  return (
    <React.Fragment>
      <nav className={`nav ${isOpen ? 'nav__open' : ''}`}>
        <div className="main-content nav__wrapper">
          <div className="nav__container main-content__wrapper d-flex">
            <div className="nav__icons d-flex">
              <div className={`nav__hamburger ${isOpen ? 'open' : ''}`} onClick={ () => {
                openSidebar('categories');
              }}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="nav__logo"
                   onClick={() => {
                     setCurrentMenu('all');
                     window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
                   }}
              ></div>
              <div className="nav__logo-text-container">
                <div className="nav__logo--text"></div>
              </div>
            </div>
            <div className="d-flex nav__actions-container">
              { isLogin &&
                <div className="d-flex nav__actions">
                  <button className="nav__balance">RM {balance.toLocaleString('en', {minimumFractionDigits:2})}</button>
                </div>
              }
              <div className="nav__divider"></div>
              <div className="d-flex nav__actions">
                { !isLogin &&
                  <div className="nav__login" id="login">
                    <button className="nav__login--btn" onClick={() =>setIsShowModal(true)}>Login</button>
                  </div>
                }

                { isLogin &&
                  <div className="nav__logout" id="login">
                    <button className="nav__logout--btn" onClick={() => logout()}>
                      <img src="/images/logout.svg" />
                    </button>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>

        {
          isOpen &&
          <div className="nav__contents d-flex">
            {
              sidebarContent === 'categories' &&
              <div className="nav__sidebar">
                <div className="nav__sidebar-list d-flex">
                  <div className="nav__sidebar-item grouped">
                    <div className={`nav__sidebar-group ${currentMenu === 'all' ? 'nav__sidebar-group--active' : ''}`} onClick={() => {
                      setCurrentMenu('all');
                      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
                    }}>
                      <img className="nav__sidebar-icon" src="/images/menu-icons/all-games.png" alt=""/>
                      <span className="nav__sidebar-label">All Games</span>
                    </div>
                    <div className={`nav__sidebar-group ${currentMenu === 'slot' ? 'nav__sidebar-group--active' : ''}`}  onClick={() => {
                      setCurrentMenu('slot');
                      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
                    }}>
                      <img className="nav__sidebar-icon" src="/images/menu-icons/slots.png" alt=""/>
                      <span className="nav__sidebar-label">Slot Games</span>
                    </div>
                    <div className={`nav__sidebar-group ${currentMenu === 'live' ? 'nav__sidebar-group--active' : ''}`} onClick={() => {
                      setCurrentMenu('live');
                      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
                    }}>
                      <img className="nav__sidebar-icon" src="/images/menu-icons/live-casino.png" alt=""/>
                      <span className="nav__sidebar-label">Live Casino</span>
                    </div>
                    <div className={`nav__sidebar-group ${currentMenu === 'progressive' ? 'nav__sidebar-group--active' : ''}`} onClick={() => {
                      setCurrentMenu('progressive');
                      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
                    }}>
                      <img className="nav__sidebar-icon" src="/images/menu-icons/video-poker.png" alt=""/>
                      <span className="nav__sidebar-label">Progressive Games</span>
                    </div>
                  </div>
                </div>
                <form onSubmit={(ev) => submitSearch(ev)}>
                  <div className="nav__sidebar__filter">
                    <div className="nav__sidebar__filter__search-wrapper">
                      <input
                        value={search}
                        onChange={handleInputChange}
                        type="text" placeholder="Search Game...."/>
                      <span className="nav__sidebar__filter__search-wrapper--icon">
                        <img src="/images/icons/search.png"/>
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            }
          </div>
        }

      </nav>
    </React.Fragment>
  )
    ;
};
