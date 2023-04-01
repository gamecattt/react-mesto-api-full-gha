import {useEffect} from 'react';
import PopupWithForm from './PopupWithForm';
import {useForm} from '../hooks/useForm';

function AddPlacePopup({ isOpen, onPlaceAdd, onClose }) {
  const { values, handleChange, setValues } = useForm({
    name: '',
    link: '',
  });

  useEffect(() => {
    setValues({
      name: '',
      link: '',
    });
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onPlaceAdd({
      name: values.name,
      link: values.link,
    });
  }

  return (
    <PopupWithForm
      name="newPost"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="form__input popup-form__input"
        name="name"
        type="text"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        id="name-input"
        value={values.name || ''}
        onChange={handleChange}
      />
      <span className="form__error-msg name-input-error"></span>
      <input
        className="form__input popup-form__input"
        name="link"
        type="url"
        placeholder="Ссылка на картинку"
        required
        id="link-input"
        value={values.link || ''}
        onChange={handleChange}
      />
      <span className="form__error-msg link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
