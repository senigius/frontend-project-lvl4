export default {
  translation: {
    chatName: 'Hexlet Chat',
    logIn: 'Вход',
    logOut: 'Выйти',
    loginPage: {
      title: 'Войти',
      username: 'Ваш ник',
      password: 'Пароль',
      btn: 'Войти',
      regQuestion: 'Нет аккаунта?',
      registrationLink: 'Регистрация',
    },
    signUpPage: {
      title: 'Регистрация',
      username: 'Имя пользователя',
      password: 'Пароль',
      passwordConfirm: 'Подтвердите пароль',
      btn: 'Зарегистрироваться',
    },
    missingPage: {
      code: '404',
      text: 'Страница не найдена ¯\\_(ツ)_/¯',
    },
    channels: {
      title: 'Каналы',
      chRemove: 'Удалить',
      chRename: 'Переименовать',
      name: 'Управление каналом',
    },
    messages: {
      messagesCount_one: '{{count}} сообщение',
      messagesCount_few: '{{count}} сообщения',
      messagesCount_many: '{{count}} сообщений',
      placeholder: 'Введите сообщение...',
      btn: 'Отправить',
    },
    modal: {
      chName: 'Имя канала',
      chMaxLength: 'Длина имени канала не должна превышать 20 символов',
      addChTitle: 'Добавить канал',
      removeChTitle: 'Удалить канал',
      removeChBody: 'Вы уверены, что хотите удалить канал',
      renameChTitle: 'Переименовать канал',
      submit: 'Отправить',
      delete: 'Удалить',
      cancel: 'Отмена',
    },
    yup: {
      required: 'Обязательное поле',
      notOneOf: 'Такой канал уже существует',
      username: 'От 3 до 20 символов',
      password: 'Не менее 6 символов',
      passwordConfirm: 'Пароли должны совпадать',
    },
    errors: {
      authFailed: 'Неверные имя пользователя или пароль',
      signUpFailed: 'Такой пользователь уже существует',
      network: 'Ошибка соединения',
    },
    notifications: {
      channelCreated: 'Канал создан',
      channelRemoved: 'Канал удалён',
      channelRenamed: 'Канал переименован',
    },
  },
};
