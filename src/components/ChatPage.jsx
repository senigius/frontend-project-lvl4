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
import { useAuth } from '../hooks/index.jsx';

const renderModal = (modal) => {
  if (!modal.type) return null;

  const Modal = buildModal(modal.type);
  return <Modal />;
};

const Chat = () => {
  const dispatch = useDispatch();
  const { getAuthHeader } = useAuth();
  const { modals } = useSelector((state) => state.modalsReducer);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(routes.usersPath(), { headers: getAuthHeader() });
        batch(() => {
          dispatch(channelsActions.setChannels(data.channels));
          dispatch(messagesActions.setMessages(data.messages));
          dispatch(channelsActions.setCurrentChannel(data.currentChannelId));
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [dispatch, getAuthHeader]);

  return (
    <>
      <Container className="h-75 my-4 overflow-hidden rounded shadow-lg">
        <Row className="h-100">
          <Col className="border-end pt-5 px-0" xs={4} md={2}>
            <Channels />
          </Col>
          <Col className="h-100 p-0">
            <Messages />
          </Col>
        </Row>
      </Container>
      {renderModal(modals)}
    </>
  );
};

export default Chat;
