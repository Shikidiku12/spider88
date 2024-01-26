import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export const LoginForm = ({ errors, user, setUser, setToastMessage }) => {
  const [ isLoading, setIsLoading ] = useState(false);

  const language = 'EN';

  const onSubmit = async (ev) => {
    ev.preventDefault();
    setIsLoading(true);
    try {
      Cookies.set('password', user.password);
      window.iapiSetClientType('casino');
      window.iapiSetClientPlatform('web');
      window.iapiLogin('SPIDER88_' + user.username, user.password, 1, language);
    } catch (err) {
      console.log('err', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login__card card">
        <img src="/images/spdr88-logo.svg" className="img-fluid"/>
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
                <img src="/images/icons/user.svg"/>
              </div>
              <input
                value={user.username}
                onChange={(ev) => setUser({...user, username: ev.target.value})}
                type="text"
                className="login__card__form__input"
                placeholder="Username"
                name="username" required/>
            </div>
            <div className="login__card__form__input-error">
              Error
            </div>
          </div>

          <div className="mb-2">
            <div className="position-relative">
              <div className="login__card__form__input--icon">
                <img src="/images/icons/lock.svg"/>
              </div>
              <input
                value={user.password}
                onChange={(ev) => setUser({ ...user, password: ev.target.value })}
                type="password"
                className="login__card__form__input"
                placeholder="Passowrd"
                name="password" required/>
            </div>
            <div className="login__card__form__input-error">
              Error
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
