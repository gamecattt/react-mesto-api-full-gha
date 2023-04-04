class Api {
  getProfile() {
    return this._request('/users/me');
  }

  getInitialCards() {
    return this._request('/cards');
  }

  updateProfile(data) {
    return this._request('/users/me', 'PATCH', data);
  }

  createPost(data) {
    return this._request('/cards', 'POST', data);
  }

  deletePost(cardId) {
    return this._request(`/cards/${cardId}`, 'DELETE');
  }

  toggleLike(cardId, isDislike = false) {
    return this._request(`/cards/${cardId}/likes`, isDislike ? 'DELETE' : 'PUT');
  }

  editAvatar(data) {
    return this._request('/users/me/avatar', 'PATCH', data);
  }

  _request(path, method = 'GET', data = null) {
    return fetch('https://gamecatisback.nomoredomains.work' + path, {
      method,
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      ...(data ? { body: JSON.stringify(data) } : {}),
    }).then(this._callback);
  }

  _callback(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export default new Api();
