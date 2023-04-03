import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import {useEffect, useState} from 'react';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Register from './Register';
import Login from './Login';
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import * as auth from '../utils/auth';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import success from '../images/icon-success.svg';
import error from '../images/icon-error.svg';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [tooltipState, setTooltipState] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getProfile(), api.getInitialCards()])
        .then(([user, cards]) => {
          setCards(cards);
          setCurrentUser(user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    handleTokenCheck();
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setTooltipState({});
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .toggleLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deletePost(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(data) {
    api
      .updateProfile(data)
      .then((profile) => {
        setCurrentUser(profile);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(avatar) {
    api
      .editAvatar(avatar)
      .then((profile) => {
        setCurrentUser(profile);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    api
      .createPost(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleTokenCheck = () => {
    const token = localStorage.getItem('token');
    if (token) {
      auth
        .checkToken(token)
        .then(() => {
          setLoggedIn(true);
          navigate('/', { replace: true });
        })
        .catch((err) => console.log(err));
    }
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleRegister = (res) => {
    setTooltipState({
      isSuccess: !!res._id,
      text: res._id
        ? 'Вы успешно зарегистрировались!'
        : 'Что-то пошло не так! Попробуйте ещё раз.',
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/sign-in', { replace: true });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__wrapper">
        <Header loggedIn={loggedIn} handleLogout={handleLogout} />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                loggedIn={loggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
              />
            }
          />
          <Route path="/sign-up" element={<Register handleRegister={handleRegister} />} />
          <Route path="/sign-in" element={<Login handleLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        {loggedIn && <Footer />}
      </div>
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onPlaceAdd={handleAddPlaceSubmit}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <InfoTooltip
        message={tooltipState}
        onClose={closeAllPopups}
        icon={tooltipState.isSuccess ? success : error}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <PopupWithForm name="confirm" title="Вы уверены?" buttonText="Да" />
    </CurrentUserContext.Provider>
  );
}

export default App;
