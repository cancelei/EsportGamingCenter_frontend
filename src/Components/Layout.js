import React from 'react';
import Navbar from './Navbar'; // Adjust the import path as needed

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}

export default Layout;
