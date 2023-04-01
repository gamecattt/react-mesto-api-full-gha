import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import * as auth from "../utils/auth";

const Login = ({handleLogin}) => {
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
    if (!formValue.email || !formValue.password) {
      return;
    }
    auth.authorize(formValue.email, formValue.password)
        .then((data) => {
          if (data.token) {
            setFormValue({email: '', password: ''});
            handleLogin();
            navigate('/', {replace: true});
          }
        })
        .catch(err => console.log(err));
  }

  return (
      <form onSubmit={handleSubmit} className="form">
        <div className="form__top">
          <h1 className="form__title">Вход</h1>
          <input required name="email" value={formValue.email} onChange={handleChange} className="form__input"
                 type="email" placeholder="Email"/>
          <span className="form__error-msg email-input-error"></span>
          <input required name="password" value={formValue.password} onChange={handleChange} className="form__input"
                 type="password" placeholder="Пароль"/>
          <span className="form__error-msg password-input-error"></span>
        </div>
        <div className="form__bottom">
          <button type="submit" className="form__btn-submit">Войти</button>
        </div>
      </form>
  )
}

export default Login;
