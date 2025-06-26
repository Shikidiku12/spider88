import Cookies from "js-cookie";
import { PusherEventsEnum } from "../enums/Pusher";
import axios from "axios";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import PersonIcon from "../../../public/images/laicai/icons/person";
import LockIcon from "../../../public/images/laicai/icons/lock";
export const LoginForm = ({
  errors,
  user,
  setUser,
  setToastMessage,
  setIsShow,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("EN");
  const [isLoginAlready, setIsLoginAlready] = useState(false);
  const language = "EN";

  const { t, i18n } = useTranslation();

  const convertLanguageCode = (langCode) => {
    const language = {
      en: "EN",
      zh: "ZH-CN",
      ms: "MS",
    };

    return language[langCode] ?? "EN";
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    setIsLoginAlready(false);

    try { 
      setIsLoading(true);
      const response = await axios.get(`/api/player/${user.username}`);
      console.log('response', response);
      const isOnline = response.data.is_online;
      if (isOnline) {
        setIsLoginAlready(true);
        return;
      }
    } catch (error) {
      console.log('error', error);
      return;
    } finally {
      setIsLoading(false);
    }

    setCurrentLanguage(convertLanguageCode(i18n.language.split('-')[0]));
    try {
      setIsLoading(true);
      window.iapiSetClientType("casino");
      window.iapiSetClientPlatform("web");
      window.iapiLogin(user.username, user.password, 1, language);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const USERNAME_PREFIX = import.meta.env.VITE_USERNAME_PREFIX || '';

  return (
    <div className="login">
      <div className="login__card">
        <div className="login__card__header">
          <button
            type="button"
            className="login__card__header-action"
            onClick={() => setIsShow(false)}
          >
            <span className="login__card__header-close-icon"></span>
          </button>
        </div>
        <img src="/images/laicai/logo/logo_complete.png" className="login__card__logo" />
        <form onSubmit={(ev) => onSubmit(ev)} className="login__card__form">
          {errors.general && (
            <div className="alert alert-danger">{errors.general}</div>
          )}
          {isLoginAlready && (
          <div className="alert alert-danger">
            Player is login already in other devices.
          </div>
          )}
    
          <div className="mb-2">
            <div className="position-relative">
              <div className="login__card__form__input__icon login__card__form__input__icon--prepend">
                <PersonIcon size={20} color="#45464C" />
              </div>
              <input
                value={user.username.replace(USERNAME_PREFIX, '')}
                onChange={(ev) => {
                  const rawValue = ev.target.value;
                  const prefixedValue = USERNAME_PREFIX + rawValue;
                  setUser({ ...user, username: prefixedValue });
                }}
                type="text"
                className="login__card__form__input"
                placeholder={t('login-form.username')}
                name="username"
                required
              />
            </div>
          </div>
          <div className="mb-2">
            <div className="position-relative">
              <div className="login__card__form__input__icon login__card__form__input__icon--prepend">
                {/* <img src="/images/laicai/icons/lock.svg" /> */}
                <LockIcon size={20} color="#45464C" />
              </div>
              <div
                className="login__card__form__input__icon login__card__form__input__icon--append"
                onClick={() => setIsShowPassword(!isShowPassword)}
              >
                {isShowPassword && <img src="/images/laicai/icons/eye-slash.svg" />}
                {!isShowPassword && <img src="/images/laicai/icons/eye-open.svg" />}
              </div>
              <input
                value={user.password}
                onChange={(ev) =>
                  setUser({ ...user, password: ev.target.value })
                }
                type={isShowPassword ? "text" : "password"}
                className="login__card__form__input"
                placeholder={t('login-form.password')}
                name="password"
                required
              />
            </div>
          </div>
          {isLoading && (
            <button
              type="button"
              className="form-group__button login__card__form-login-btn"
              disabled
            >
              <span className="loader"></span>
            </button>
          )}
          {!isLoading && (
            <button
              type="submit"
              className="form-group__button login__card__form-login-btn"
            >
              {t('login-form.login')}
            </button>
          )}

          {/* <div className="login__card__form__footer">
            <label>
              <input
                type="checkbox"
                className="login__card__form__footer__checkbox"
                checked
              />
              {t('login-form.remember-me')}
            </label>
          </div> */}
        </form>
      </div>
    </div>
  );
};
