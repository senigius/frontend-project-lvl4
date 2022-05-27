import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import {
  Form,
  InputGroup,
} from 'react-bootstrap';
import { useAuth, useSocket } from '../hooks';

const Messages = () => {
  const inputRef = useRef();
  const socket = useSocket();
  const { userId } = useAuth();
  const { currentChannel, channels } = useSelector((state) => state.channelsReducer);
  const CurrentChannelName = channels.find(({ id }) => id === currentChannel?.name);

  const messages = useSelector((state) => {
    const generalMessages = state.messagesReducer.messages;
    return generalMessages.filter(({ channelId }) => channelId === currentChannel);
  });

  useEffect(() => inputRef.current.focus(), []);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: (values, actions) => {
      const message = {
        body: values.body,
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
                <div className="bg-light mb-4 p-3 shadow-sm small">
                    <p className="m-0">
                        <b>{`# ${CurrentChannelName}`}</b>
                    </p>
                    <span className="text-muted">{messages.length}  сообщений</span>
                </div>
                <div id="message-box" className="chat-messages overflow-auto px-5">
                    {messages.length > 0 && messages.map((message) => (
                        <div className="text-break mb-2" key={message.id}>
                            <b>{message.username}</b>
                            :
                            {message.body}
                        </div>
                    ))}
                </div>
                <div className="mt-auto px-5 py-3">
                    <Form onSubmit={formik.handleSubmit} className="py-1 border rounded-2" noValidate>
                        <InputGroup hasValidation>
                            <Form.Control
                                disabled={formik.isSubmitting}
                                onChange={formik.handleChange}
                                value={formik.values.body}
                                ref={inputRef}
                                name="body"
                                aria-label="Новое сообщение"
                                className="border-0 p-0 ps-2"
                                type="text"
                                placeholder="Введите сообщение..."
                            />
                            <button
                              type="submit"
                              disabled={!formik.values.body.trim()
                                || formik.isSubmitting
                                || !socket.connected}
                              className="btn btn-group-vertical"
                            >
                                <span>Отправить</span>
                            </button>
                        </InputGroup>
                    </Form>
                </div>
            </div>
        </>
  );
};

export default Messages;
