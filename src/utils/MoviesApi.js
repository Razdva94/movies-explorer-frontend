class MoviesApi {
  constructor(options) {
    this._headers = options.headers;
    this._url = options.baseUrl;
  }

  getMovies() {
    return this._request(`${this._url}`, {
      method: 'GET',
      headers: this._headers,
    });
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    console.log(res);
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then((res) => this._checkResponse(res));
  }
}
const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default moviesApi;
