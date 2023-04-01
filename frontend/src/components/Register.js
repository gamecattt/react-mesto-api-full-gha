import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import * as auth from "../utils/auth";

const Register = ({handleRegister}) => {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    auth.register(formValue.email, formValue.password).then((res) => {
      handleRegister(res);
      if (res.data) {
        navigate('/sign-in', {replace: true});
      }
    }).catch((err) => handleRegister(err));
  }

  return (
      <form onSubmit={handleSubmit} className="form">
        <div className="form__top">
          <h1 className="form__title">Регистрация</h1>
          <input required name="email" value={formValue.email} onChange={handleChange} className="form__input"
                 type="email" placeholder="Email"/>
          <span className="form__error-msg email-input-error"></span>
          <input required name="password" value={formValue.password} onChange={handleChange} className="form__input"
                 type="password" placeholder="Пароль"/>
          <span className="form__error-msg password-input-error"></span>
        </div>
        <div className="form__bottom">
          <button type="submit" className="form__btn-submit">Зарегистрироваться</button>
          <p className="form__caption">Уже зарегистрированы? <Link to="/sign-in" className="form__link">Войти</Link></p>
        </div>
      </form>
  );
}

export default Register;

