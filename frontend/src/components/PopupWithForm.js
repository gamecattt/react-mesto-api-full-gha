function PopupWithForm({name, isOpen, title, buttonText, onClose, children, onSubmit}) {
  return (
      <div className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`} id={`${name}Popup`}>
        <div className="popup__container">
          <h3 className="popup__title">{title}</h3>
          <form className="popup-form" action="#" name={`${name}Form`} noValidate onSubmit={onSubmit}>
            {children}
            <button className="form__btn-submit popup-form__btn-submit" type="submit">
              {buttonText}
            </button>
          </form>
          <button
              className="popup__btn-close"
              type="button"
              aria-label="Закрыть"
              onClick={onClose}
          ></button>
        </div>
      </div>
  );
}

export default PopupWithForm;
