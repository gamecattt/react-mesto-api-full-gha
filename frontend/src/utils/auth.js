export const BASE_URL = 'https://gamecatisback.nomoredomains.work';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        return res;
      });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
      .then((response => response.json()))
      .then((data) => {
        if (data.token){
          localStorage.setItem('token', data.token);
          localStorage.setItem('email', email);
          return data;
        }
      });
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
      .then(res => res.json())
      .then(data => data)
}
