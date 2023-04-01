import PopupWithForm from './PopupWithForm';
import {useRef} from 'react';

function EditAvatarPopup(props) {
  const avatarInput = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarInput.current.value,
    });
  }

  return (
      <PopupWithForm
          name="avatar"
          title="Обновить аватар"
          buttonText="Сохранить"
          isOpen={props.isOpen}
          onClose={props.onClose}
          onSubmit={handleSubmit}
      >
        <input
            className="form__input popup-form__input"
            name="avatar"
            type="url"
            placeholder="Ссылка на картинку"
            required
            id="avatar-input"
            ref={avatarInput}
        />
        <span className="form__error-msg avatar-input-error"></span>
      </PopupWithForm>
  );
}

export default EditAvatarPopup;
