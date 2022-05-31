import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Form,
  InputGroup,
  Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { animateScroll } from 'react-scroll';
import { useFormik } from 'formik';
import filter from 'leo-profanity';

import { useAuth, useSocket } from '../hooks';

const Messages = () => {
  const inputRef = useRef();
  const socket = useSocket();
  const { userId } = useAuth();
  const { t } = useTranslation();
  const { currentChannel, channels } = useSelector((state) => state.channelsReducer);
  const currentChannelName = channels.find(({ id }) => id === currentChannel)?.name;

  const messages = useSelector((state) => {
    const generalMessages = state.messagesReducer.messages;
    return generalMessages.filter(({ channelId }) => channelId === currentChannel);
  });

  useEffect(() => inputRef.current.focus(), [currentChannel]);

  useEffect(() => {
    animateScroll.scrollToBottom({
      duration: 0,
      containerId: 'message-box',
    });
  }, [messages]);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: (values, actions) => {
      const message = {
        body: filter.clean(values.body),
        channelId: currentChannel,
        username: userId.username,
      };
      socket.emit('newMessage', message, () => {
        actions.resetForm();
        inputRef.current.focus();
      });
    },
  });

  return (
    <>
      <div className="d-flex flex-column h-100">
        <div className="mb-4 p-3 shadow-sm">
          <p className="m-0">
            <b>{`# ${currentChannelName}`}</b>
          </p>
          <span className="text-muted">
            {t('messages.messagesCount', { count: messages.length })}
          </span>
        </div>
        <div id="message-box" className="chat-messages overflow-auto px-5">
          {messages.length > 0 && messages.map((message) => (
            <div className="text-break mb-2" key={message.id}>
              <b>{message.username}</b>
              : {message.body}
            </div>
          ))}
        </div>
        <div className="m-3 p-0 mt-auto overflow-auto">
          <Form onSubmit={formik.handleSubmit} className="p-2 rounded-2" noValidate>
            <InputGroup hasValidation>
              <Form.Control
                disabled={formik.isSubmitting}
                onChange={formik.handleChange}
                value={formik.values.body}
                ref={inputRef}
                name="body"
                aria-label="Новое сообщение"
                className="border-1 p-0 ps-2 overflow-auto"
                type="text"
                placeholder={t('messages.placeholder')}
              />
              <Button
                type="submit"
                disabled={!formik.values.body.trim()
                  || formik.isSubmitting
                  || !socket.connected}
                className="btn btn-dark text-warning border-0 p-2 m-0"
              >
                {t('messages.btn')}
              </Button>
            </InputGroup>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Messages;
