import { useContext } from 'react';
import AuthCntxt from '../context/AuthPro';

const comAuth = () => useContext(AuthCntxt);

export default comAuth;