import React, { useEffect } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';

import Channels from '../Channels.jsx';
import Messages from '../Messages.jsx';

import { fetchChannels } from '../../slices/channelsSlice.js';
import { fetchMessages } from '../../slices/messagesSlice.js';
import buildModal from '../ChannelsModals/index.js';
import { useAuth } from '../../hooks/index.jsx';
import { getModals } from '../../slices/selectors.js';

const renderModal = (modal) => {
  if (!modal.type) return null;

  const Modal = buildModal(modal.type);
  return <Modal />;
};

const ChatPage = () => {
  const dispatch = useDispatch();
  const { getAuthHeader } = useAuth();
  const modals = useSelector(getModals);

  useEffect(() => {
    batch(() => {
      dispatch(fetchChannels(getAuthHeader()));
      dispatch(fetchMessages(getAuthHeader()));
    });
  }, [dispatch, getAuthHeader]);

  return (
    <>
      <Container className="h-75 my-4 overflow-hidden rounded shadow-lg">
        <Row className="h-100">
          <Col className="border-end pt-5 px-0 overflow-auto" xs={4} md={2}>
            <Channels />
          </Col>
          <Col className="h-100 p-1">
            <Messages />
          </Col>
        </Row>
      </Container>
      {renderModal(modals)}
    </>
  );
};

export default ChatPage;
