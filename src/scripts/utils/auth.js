export const BASE_URL = 'https://api.lusya-movies-explorer.nomoredomains.xyz';

const request = ({url, method = 'POST', token, body}) => {
  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...!!token && { 'Authorization': `Bearer ${token}` },
    },
    ...!!body && { body: JSON.stringify(body) },
  }
  return fetch(`${BASE_URL}${url}`, config)
  .then((response) => {
    if(response.ok) {
      return response.json();
    }
    return Promise.reject(response.status)
  })
}

export const register = (name, email, password) => {
  return request({
    url: '/signup',
    body: {name, email, password},
  });
};

export const authorize = (password, email) => {
  return request({
    url: '/signin',
    body: { password, email },
  });
};

export const checkToken = (token) => {
  return request({
    url: '/users/me',
    method: 'GET',
    token,
  });
}
