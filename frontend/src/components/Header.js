import logo from '../images/logo.svg';
import {NavLink, useLocation} from 'react-router-dom';

function Header({ loggedIn, handleLogout }) {
  const location = useLocation();
  const email = localStorage.getItem('email');

  return (
    <header className="header">
      <a className="header__logo" href="#">
        <img className="header__logo-img" src={logo} alt="Место" />
      </a>
      <div className="header__info">
        {location.pathname === '/sign-in' ? (
          <NavLink to="/sign-up" className="header__link">
            Регистрация
          </NavLink>
        ) : (
          ''
        )}
        {location.pathname === '/sign-up' ? (
          <NavLink to="/sign-in" className="header__link">
            Войти
          </NavLink>
        ) : (
          ''
        )}
        {loggedIn ? (
          <>
            <span className="header__email">{email}</span>
            <button className="header__link" onClick={handleLogout}>
              Выйти
            </button>
          </>
        ) : (
          ''
        )}
      </div>
    </header>
  );
}

export default Header;
