export const Highlights = () => {

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
                    <button className="highlight__card--btn">Play Now</button>
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
                    <button className="highlight__card--btn">Play Now</button>
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
                <button className="highlight__download-btn">Download App</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
    ;
};
