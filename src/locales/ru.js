export default {
  translation: {
    chatName: 'Hexlet Chat',
    logIn: 'Вход',
    logOut: 'Выйти',
    loginPage: {
      title: 'Войти',
      username: 'Имя пользователя',
      password: 'Пароль',
      btn: 'Войти',
      regQuestion: 'Нет аккаунта?',
      registrationLink: 'Зарегистрироваться',
    },
    signUpPage: {
      title: 'Регистрация',
      username: 'Ваше имя',
      password: 'Пароль',
      passwordConfirm: 'Подтвердите пароль',
      btn: 'Зарегестрироваться',
    },
    missingPage: {
      code: '404',
      text: 'Страница не найдена ¯\\_(ツ)_/¯',
    },
    channels: {
      title: 'Каналы',
      chRemove: 'Удалить',
      chRename: 'Переименовать',
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
      chMaxLength: 'Длина имени канала не должна превышать 10 символов',
      addChTitle: 'Добавить канал',
      removeChTitle: 'Удалить канал',
      removeChBody: 'Вы уверены, что хотите удалить канал',
      renameChTitle: 'Переименовать канал',
      submit: 'Подтвердить',
      cancel: 'Отмена',
    },
    yup: {
      required: 'Обязательное поле',
      notOneOf: 'Такой канал уже существует',
      username: 'Длина имени должна быть от 3 до 20 символов',
      password: 'Длина пароля должна быть больше 6',
      passwordConfirm: 'Пароли должны совпадать',
    },
    errors: {
      authFailed: 'Неверные имя пользователя или пароль',
      signUpFailed: 'Такой пользователь уже существует',
      network: 'Ошибка сети',
    },
    notifications: {
      channelCreated: ' Канал создан',
      channelRemoved: ' Канал удалён',
      channelRenamed: ' Канал переименован',
    },
  },
};