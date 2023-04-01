import {useContext} from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `post__btn-like ${isLiked && 'post__btn-like_active'}`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
      <>
        <img className="post__img" src={card.link} alt={card.name} onClick={handleClick}/>
        {isOwn && (
            <button
                className="post__btn-trash"
                type="button"
                aria-label="Удалить"
                onClick={handleDeleteClick}
            ></button>
        )}
        <div className="post__bar">
          <h2 className="post__caption">{card.name}</h2>
          <div className="post__likes">
            <button
                className={cardLikeButtonClassName}
                type="button"
                aria-label="Поставить лайк"
                onClick={handleLikeClick}
            ></button>
            <span className="post__total-likes">{card.likes.length}</span>
          </div>
        </div>
      </>
  );
}

export default Card;
