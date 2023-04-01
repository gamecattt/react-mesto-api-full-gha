import {useContext, useEffect, useState} from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
      <PopupWithForm
          name="profile"
          title="Редактировать профиль"
          buttonText="Сохранить"
          isOpen={props.isOpen}
          onClose={props.onClose}
          onSubmit={handleSubmit}
      >
        <input
            className="form__input popup-form__input"
            name="name"
            type="text"
            placeholder="Имя"
            required
            minLength="2"
            maxLength="40"
            id="nickname-input"
            value={name || ''}
            onChange={handleNameChange}
        />
        <span className="form__error-msg nickname-input-error"></span>
        <input
            className="form__input popup-form__input"
            name="about"
            type="text"
            placeholder="О себе"
            required
            minLength="2"
            maxLength="200"
            id="about-input"
            value={description || ''}
            onChange={handleDescriptionChange}
        />
        <span className="form__error-msg about-input-error"></span>
      </PopupWithForm>
  );
}

export default EditProfilePopup;
