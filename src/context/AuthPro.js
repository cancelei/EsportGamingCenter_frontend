/* eslint-disable */
import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const AuthCntxt = createContext({});

export function AuthPro({ children }) {
  const [auth, setAuth] = useState({});
  return (
    <AuthCntxt.Provider value={{ auth, setAuth }}>
      {children}
    </AuthCntxt.Provider>
  );
}
AuthPro.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthCntxt;