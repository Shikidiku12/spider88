import AnimatedCountUp from "./AnimatedCountUp.jsx";
import '../../sass/components/jackpot.scss';
import {useTranslation} from "react-i18next";

export const JackpotWidget = () => {
  const { t } = useTranslation();

  return (
    <div className="main-content">
      <div className="main-content__wrapper">
        <div className="featured">
          <div className="featured__container">
            <div className="featured__progressive-jackpot">
              <div className="featured__progressive-jackpot--accent-left"></div>
              <div className="featured__progressive-jackpot--accent-right"></div>
              <div className="featured__progressive-jackpot--accent-text">Progressive Jackpot</div>

              <span className="featured__progressive-jackpot--text">{t('playtech-progressive-jackpot')}</span>
              <div className="featured__progressive-jackpot-money">
                <span className="featured__progressive-jackpot-money--currency">RM</span>
                <span className="featured__progressive-jackpot-money--amount">
              <AnimatedCountUp duration={800000000} endValue={1000000}/>
            </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
