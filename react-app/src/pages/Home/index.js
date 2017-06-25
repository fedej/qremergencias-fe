import React from 'react';

import Nav from '../../components/Nav';
import Drawer from '../../components/Drawer';

export default function Landing({ children }) {
  return (
    <div>
      <Nav />
      <Drawer />
      <div style={{ marginTop: '1.5em' }}>{children}</div>
    </div>
  );
}
