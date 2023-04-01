class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

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
    return fetch(this._baseUrl + path, {
      method,
      headers: this._headers,
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

const api = new Api({
  baseUrl: 'https://gamecatisback.nomoredomains.work',
  headers: {
    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE5YzNlMTAxZmFhMDZmOTY3ZWQwNTUiLCJpYXQiOjE2Nzk0MTAxODgsImV4cCI6MTY4MDAxNDk4OH0.wHdoEX8zMMSZWbkrMLQRb9WFsLWQvJrqgWvnRzMJZzI',
    'Content-Type': 'application/json',
  },
});

export default api;