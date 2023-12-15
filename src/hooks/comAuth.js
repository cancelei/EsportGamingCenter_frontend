import { useContext } from 'react';
import AuthCntxt from '../context/AuthPro';

const useAuth = () => useContext(AuthCntxt);

export default useAuth;
