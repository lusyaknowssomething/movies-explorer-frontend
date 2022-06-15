class MoviesApi {
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

  getMovies() {
    return fetch(`${this._url}`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._errorHandler)
  }

}

const moviesApi = new MoviesApi( {
  url: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
   "content-type": "application/json"
  }
});

export default moviesApi;
