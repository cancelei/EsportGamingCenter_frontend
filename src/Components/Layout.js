import React from 'react';
import PropTypes from 'prop-types';
import Navbar from './Navbar'; // Adjust the import path as needed

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
