import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export const LoginForm = ({ errors, user, setUser, setToastMessage }) => {
  const [isLoading, setIsLoading] = useState(false);

  const language = 'EN';

  const onSubmit = async (ev) => {
    ev.preventDefault();
    setIsLoading(true);
    try {

      const { data } = await axios.post('/get-access-token', {
        username: user.username,
        password: user.password
      });
      const { access_token } = data;
      Cookies.set('access_token', access_token);
      window.iapiSetClientType('casino');
      window.iapiSetClientPlatform('web');
      window.iapiLogin('SPIDER88_' + user.username, user.password, 1, language);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login__card">
        <img src="/images/spdr88-logo.svg" className="login__card__logo" />
        <form onSubmit={(ev) => onSubmit(ev)}
          className="login__card__form">
          {errors.general &&
            <div className="alert alert-danger">
              {errors.general}
            </div>
          }
          <div className="mb-2">
            <div className="position-relative">
              <div className="login__card__form__input--icon">
                <img src="/images/icons/user.svg" />
              </div>
              <input
                value={user.username}
                onChange={(ev) => setUser({ ...user, username: ev.target.value })}
                type="text"
                className="login__card__form__input"
                placeholder="Username"
                name="username" required />
            </div>
            {/*<div className="login__card__form__input-error">*/}
            {/*  Error*/}
            {/*</div>*/}
          </div>

          <div className="mb-2">
            <div className="position-relative">
              <div className="login__card__form__input--icon">
                <img src="/images/icons/lock.svg" />
              </div>
              <input
                value={user.password}
                onChange={(ev) => setUser({ ...user, password: ev.target.value })}
                type="password"
                className="login__card__form__input"
                placeholder="Passowrd"
                name="password" required />
            </div>
            {/*<div className="login__card__form__input-error">*/}
            {/*  Error*/}
            {/*</div>*/}
          </div>
          {isLoading &&
            <button type="button" className="form-group__button login__card__form-login-btn" disabled>
              <span className="loader"></span>
            </button>
          }
          {!isLoading &&
            <button type="submit" className="form-group__button login__card__form-login-btn">
              Login
            </button>
          }

        </form>
      </div>
    </div>
  );
};
