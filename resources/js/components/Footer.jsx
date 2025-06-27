import '../../sass/components/footer.scss';
import {useTranslation} from "react-i18next";

export const Footer = () => {
  const links = [
    'Games', 'Promotions', 'Banking', 'Support', 'Terms and Conditions', 'Privacy Policy'
  ];

  const { t } = useTranslation();

  return (
    <div className="footer main-content">
      <div className="footer__accent-left"></div>
      <div className="footer__accent-right"></div>
      <div className="footer__container">
        <div class="footer__logoimage"></div>
        <div className="footer__info info">
          <div className="info__link link">
            <a href="javascript:;" className="link-item">{t('about-us')}</a>
            <a href="javascript:;" className="link-item">{t('terms-services')}</a>
            <a href="javascript:;" className="link-item">{t('contact-us')}</a>
          </div>
          <div className="info__copyright">
            &copy; {new Date().getFullYear()} {t('all-rights-reserved')} www.spider88.com 
          </div>
        </div>
      </div>
    </div>
  );
};
