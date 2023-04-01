import React, {useContext} from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main({
                onEditAvatar,
                onEditProfile,
                onAddPlace,
                onCardClick,
                onCardLike,
                onCardDelete,
                cards,
              }) {
  const currentUser = useContext(CurrentUserContext);
  const cardsElements = cards.map((card) => (
      <li key={card._id} className="post">
        <Card
            card={card}
            key={card._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
        ></Card>
      </li>
  ));

  return (
      <main className="content">
        <section className="profile">
          <div className="profile__avatar">
            <img className="profile__avatar-img" src={currentUser.avatar} alt={currentUser.name}/>
            <button
                className="profile__avatar-edit"
                type="button"
                aria-label="Изменить фото"
                onClick={onEditAvatar}
            ></button>
          </div>
          <div className="profile__info">
            <div className="profile__heading">
              <h1 className="profile__nickname">{currentUser.name}</h1>
              <button
                  className="profile__btn-edit"
                  type="button"
                  aria-label="Редактировать профиль"
                  onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__description">{currentUser.about}</p>
          </div>
          <button
              className="profile__btn-add"
              type="button"
              aria-label="Добавить фото"
              onClick={onAddPlace}
          ></button>
        </section>
        <section className="showcase">
          <ul className="showcase__list">
            {cardsElements}
          </ul>
        </section>
      </main>
  );
}

export default Main;
