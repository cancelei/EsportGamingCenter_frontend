import React from 'react';
import PropTypes from 'prop-types';
import Navbar from './Navbar'; // Adjust the import path as needed

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ maxWidth: '100vw' }}>{children}</main>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
