export const Footer = () => {
  const links = [
    'Games', 'Promotions', 'Banking', 'Support', 'Terms and Conditions', 'Privacy Policy'
  ];

  return (
    <div className="footer">
      <div className="footer__container">
        <div className="footer__accent-left"></div>
        <div className="footer__accent-right"></div>
        <div className="footer__logo">
          <img src="/images/footer-logo.png"/>
        </div>
        <div className="footer__info info">
          <div className="info__link link">
            <a href="javascript:;" className="link-item">About Us</a>
            <a href="javascript:;" className="link-item">Terms of Services</a>
            <a href="javascript:;" className="link-item">Contact Us</a>
          </div>
          <div className="info__copyright">
            &copy; {new Date().getFullYear()} www.spdr88.com All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};
