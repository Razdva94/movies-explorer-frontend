// константы в App
export const registerInputs = [
  { title: 'Имя', type: 'text', name: 'name' },
  { title: 'E-mail', type: 'email', name: 'email' },
  { title: 'Пароль', type: 'password', name: 'password' }
];

export const loginInputs = [
  { title: 'E-mail', type: 'email', name: 'email' },
  { title: 'Пароль', type: 'password', name: 'password' },
];
export const registerMargin = 'register__button_margin';
export const loginMargin = 'login__button_margin';
export const sayHiRegister = 'Добро пожаловать!';
export const sayHiLogin = 'Рады видеть!';
export const buttonRegister = [
  'Зарегистрироваться',
  'Уже зарегистрированы?',
  ' Войти',
];
export const buttonLogin = [
  'Войти',
  'Еще не зарегистрированы?',
  ' Регистрация',
];

export const errorMessage =
' Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.';
export const errorKeyWord = 'Нужно ввести ключевое слово';
export const errorRequest = 'Ничего не найдено';
