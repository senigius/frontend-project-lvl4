import { useContext } from 'react';

import { AuthContext } from '../contexts/AuthContext.jsx';
import APIContext from '../contexts/APIContext.jsx';

const useAPI = () => useContext(APIContext);
const useAuth = () => useContext(AuthContext);

export { useAuth, useAPI };
