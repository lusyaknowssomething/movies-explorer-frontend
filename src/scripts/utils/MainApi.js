class Api {
  constructor( {url, headers} ) {
    this._url = url;
    this._headers = headers;
  }

  _errorHandler(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }


  //получить данные пользователя (GET)
  getUserData(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        "content-type": "application/json"
      }
    }).then(this._errorHandler)
  }

  //заменить данные пользователя (PATCH)
  patchUserData(data) {
    console.log(token);
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    }).then(this._errorHandler)
  }

  //получить список всех фильмов в виде массива (GET)
  getMovies(token) {
    return fetch(`${this._url}/movies`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        "content-type": "application/json"
      }
    }).then(this._errorHandler)
  }

  //добавить фильм (POST)
  postMovie(data) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    }).then(this._errorHandler)
  }

  //удалить фильм (DELETE)
  deleteMovie(id) {
    return fetch(`${this._url}/movies/${id}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(this._errorHandler)
  }

}

const token = localStorage.getItem('token');

const api = new Api( {
  url: 'https://api.lusya-movies-explorer.nomoredomains.xyz',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    "content-type": "application/json"
  }
});

export default api;
