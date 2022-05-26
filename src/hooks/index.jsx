import { useContext } from 'react';
import { AuthContext } from '../contexts/index.jsx';

const useAuth = () => useContext(AuthContext);

export default useAuth;
