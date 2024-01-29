import '../../sass/components/highlight.scss';

export const Highlights = ({ setCurrentMenu }) => {

  return (
    <div className="main-content">
      <div className="main-content__wrapper">
        <div className="highlight d-flex">
          <div className="highlight__header d-flex">
            <div className="highlight__title d-flex">
              <div className="highlight__title--icon" style={{backgroundImage: "url('/images/star.png')"}}>
              </div>
              <span className="highlight__title--text"> Highlights </span>
            </div>
          </div>

          <div className="highlight__cards">
            <div className="highlight__cards--slider">
              <div className="highlight__card" style={{backgroundImage: "url('/images/highlight-bg-1.png')"}}>
                <div className="highlight__card-container">
                  <div className="highlight__card-text">
                    <span className="highlight__card--title">Live Games</span>
                    <span className="highlight__card--description">Choose the champion!</span>
                    <button className="highlight__card--btn" onClick={() => {
                      setCurrentMenu('live');
                      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
                    }}>Play Now
                    </button>
                  </div>
                </div>
              </div>

              <div className="highlight__card" style={{backgroundImage: "url('/images/highlight-bg-2.png')"}}>
                <div className="highlight__card-container">
                  <div className="highlight__card-text">
                    <span className="highlight__card--title">Table Games & card</span>
                    <span className="highlight__card--description">Discover our premium games</span>
                    <button className="highlight__card--btn">Play Now</button>
                  </div>
                </div>
              </div>

              <div className="highlight__card" style={{backgroundImage: "url('/images/highlight-bg-3.png')"}}>
                <div className="highlight__card-container">
                  <div className="highlight__card-text">
                    <span className="highlight__card--title">Slot Club</span>
                    <span className="highlight__card--description">Spin your way to riches</span>
                    <button className="highlight__card--btn" onClick={() => {
                      setCurrentMenu('slot');
                      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                    }}>Play Now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="highlight__header d-flex">
            <div className="highlight__title d-flex">
              <span className="highlight__title--text">Download The App</span>
            </div>
          </div>

          <div className="highlight__download">
            <div className="highlight__download-container">
              <div className="highlight__download-accent"></div>
              <div className="highlight__download-texts">
                <span className="highlight__download-title">Win big jackpot!</span>
                <span className="highlight__download-description">Don't miss out on your chance to win life-changing money!</span>
                <div className="highlight__download-action">
                  <a href="https://pt.launcher.horizon88.com/materials/apk/Spider88_v2.1.apk"
                     className="highlight__download-btn highlight__download-btn--solid">
                    <div className="highlight__download-btn-wrapper">
                      <span className="highlight__download-btn-subtext">Download .apk</span>
                      <span className="highlight__download-btn-text">For Android</span>
                      <span className="highlight__download-btn--solid-icon">
                        <img src="/images/android.svg" />
                      </span>
                    </div>
                  </a>
                  <a href="https://pt.launcher.horizon88.com/materials/dl/spider88_dl_v2.1.exe"
                     className="highlight__download-btn highlight__download-btn--outline">
                    <div className="highlight__download-btn-wrapper">
                      <span className="highlight__download-btn-subtext">Download .exe</span>
                      <span className="highlight__download-btn-text">For Windows</span>
                      <span className="highlight__download-btn--outline-icon">
                        <img src="/images/windows.svg"/>
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
    ;
};
