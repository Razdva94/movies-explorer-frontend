/* eslint-disable no-sequences */
class MainApi {
  constructor(options) {
    this._headers = options.headers;
    this._url = options.baseUrl;
  }

  getUser() {
    return this._request(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
    });
  }

  getSavedMovies() {
    return this._request(`${this._url}/movies`, {
      method: 'GET',
      headers: this._headers,
    });
  }

  deleteCardFromServer(_id) {
    return this._request(`${this._url}/movies/${_id}`, {
      method: 'DELETE',
      headers: this._headers,
    });
  }

  postToSignup({ name, email, password }) {
    return this._request(`${this._url}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
  }

  postToSignin({ email, password }) {
    return this._request(`${this._url}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email,
        password,
      }),
    });
  }

  getToSignout() {
    return this._request(`${this._url}/signout`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  postMovie({
    country,
    director,
    year,
    duration,
    description,
    image: imageUrl,
    trailerLink,
    id: movieId,
    nameRU,
    nameEN,
  }) {
    const image = `https://api.nomoreparties.co/${imageUrl.url}`;
    const thumbnail = `https://api.nomoreparties.co/${imageUrl.formats.thumbnail.url}`;
    return this._request(`${this._url}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        country,
        director,
        year,
        duration,
        description,
        image,
        trailerLink,
        thumbnail,
        movieId,
        nameRU,
        nameEN,
      }),
    });
  }

  changeProfileInfo({ name, email }) {
    return this._request(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        email,
      }),
    });
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return res.json().then((error) => Promise.reject(error));
  }

  _request(url, options) {
    const updatedOptions = {
      ...options,
      credentials: 'include',
    };

    return fetch(url, updatedOptions).then((res) => this._checkResponse(res));
  }
}
const mainApi = new MainApi({
  baseUrl: 'https://api.portfolio-project.nomoredomains.xyz',
  headers: {
    'Content-Type': 'application/json',
  },
});
export default mainApi;
