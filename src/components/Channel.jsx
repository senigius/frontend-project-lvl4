import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Nav,
  ButtonGroup,
  Dropdown,
} from 'react-bootstrap';
import cn from 'classnames';

import { actions as channelsActions } from '../slices/channelsSlice';

const Channel = ({ id, name }) => {
  const { currentChannel } = useSelector((state) => state.channelsReducer);
  const dispatch = useDispatch();
  const btnClasses = cn({
    'w-100 rounded-0 text-start text-truncate btn': true,
    'btn-secondary': id === currentChannel,
  });

  return (
        <Nav.Item as="li" className="w-100">
            <Dropdown className="d-flex" as={ButtonGroup}>
                <button
                  onClick={() => dispatch(channelsActions.setCurrentChannel(id))}
                  type="button"
                  className={btnClasses}
                >
                    <span className="me-1">#</span>
                    {name}
                </button>
            </Dropdown>
        </Nav.Item>
  );
};

export default Channel;
