import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Nav,
  ButtonGroup,
  Dropdown,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { actions as channelsActions } from '../slices/channelsSlice';
import { actions as modalsActions } from '../slices/modalsSlice';
import { getCurrentChannel } from '../slices/selectors';

const Channel = ({ id, name, removable }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const currentChannel = useSelector(getCurrentChannel);

  const btnClasses = cn({
    'w-100 rounded-0 text-start text-truncate btn': true,
    'btn-warning': id === currentChannel,
  });

  const handleRename = () => {
    dispatch(modalsActions.showModal({ type: 'renameChannel', item: { id, name } }));
  };

  const handleRemove = () => {
    dispatch(modalsActions.showModal({ type: 'removeChannel', item: { id, name } }));
  };

  const handleActiveChannel = () => {
    dispatch(channelsActions.setCurrentChannel(id));
  };

  if (!removable) {
    return (
      <Nav.Item as="li" className="w-100">
        <button
          onClick={handleActiveChannel}
          type="button"
          className={btnClasses}
        >
          <span className="me-1">#</span>
          {name}
        </button>
      </Nav.Item>
    );
  }

  return (
    <Nav.Item as="li" className="w-100">
      <Dropdown className="d-flex" as={ButtonGroup}>
        <button
          onClick={handleActiveChannel}
          type="button"
          className={btnClasses}
        >
          <span className="me-1">#</span>
          {name}
        </button>
        <Dropdown.Toggle split variant={id === currentChannel && 'secondary'}>
          <span className="visually-hidden">{t('channels.name')}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={handleRename}>
            {t('channels.chRename')}
          </Dropdown.Item>
          <Dropdown.Item onClick={handleRemove}>
            {t('channels.chRemove')}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav.Item>
  );
};

export default Channel;
