// @ts-check

import ReactDOM from 'react-dom';
// @ts-ignore
import { io } from 'socket.io-client';
import 'core-js/stable/index.js';

import '../assets/application.scss';

import init from './init.jsx';

const app = async () => {
  const socket = io.connect();
  const vdom = await init(socket);
  const root = document.getElementById('chat');
  ReactDOM.render(vdom, root);
};

app();
