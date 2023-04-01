function ImagePopup({card, onClose}) {
  return (
      <div className={`popup popup_for_img ${card ? 'popup_opened' : ''}`} id="imagePopup">
        <div className="popup-img">
          <button
              className="popup__btn-close"
              type="button"
              aria-label="Закрыть"
              onClick={onClose}
          ></button>
          <img className="popup-img__image" src={card?.link} alt={card?.name}/>
          <p className="popup-img__caption">{card?.name}</p>
        </div>
      </div>
  );
}

export default ImagePopup;
