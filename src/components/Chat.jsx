import React, { useEffect } from 'react';
import { useDispatch, batch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';

import routes from '../routes.js';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';

import { actions as channelsActions } from '../slices/channelsSlice';
import { actions as messagesActions } from '../slices/messagesSlice';
import buildModal from './ChannelsModals/index.js';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }
  return {};
};

const renderModal = (modal) => {
  if (!modal.type) return null;

  const Modal = buildModal(modal.type);
  return <Modal />;
};

const Chat = () => {
  const dispatch = useDispatch();
  const { modals } = useSelector((state) => state.modalsReducer);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(routes.usersPath(), { headers: getAuthHeader() });
        batch(() => {
          dispatch(channelsActions.setChannels(data.channels));
          dispatch(messagesActions.setMessages(data.messages));
          dispatch(channelsActions.setCurrentChannel(data.currentChannel));
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <>
        <Container className="h-100 my-4 overflow-hidden rounded shadow w-100">
            <Row className="bg-light">
                <Col className="border-end pt-5 px-0 bg-light" xs={4} md={2}>
                    <Channels />
                </Col>
                <Col className="p-0">
                    <Messages />
                </Col>
            </Row>
        </Container>
        {renderModal(modals)}
    </>
  );
};

export default Chat;
