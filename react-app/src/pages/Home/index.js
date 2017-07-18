import React from 'react';
import PropTypes from 'prop-types';

import Nav from '../../components/Nav';
import Drawer from '../../components/Drawer';

function Home({ children }) {
  return (
    <div>
      <Nav />
      <Drawer />
      <div style={{ marginTop: '1.5em' }}>{children}</div>
    </div>
  );
}

Home.defaultProps = {
  children: null,
};

Home.propTypes = {
  children: PropTypes.element,
};

export default Home;
