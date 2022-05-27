import { useContext } from 'react';

import { AuthContext } from '../contexts/authContext.jsx';
import SocketContext from '../contexts/socketContext.jsx';

const useSocket = () => useContext(SocketContext);
const useAuth = () => useContext(AuthContext);

export { useAuth, useSocket };
