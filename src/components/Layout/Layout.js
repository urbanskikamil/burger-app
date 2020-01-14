import React from 'react'

import Aux from '../../hoc/Aux'

const layout = (props) => (
  <Aux>
    <div>Toolab, SideDrawer, Backdrop</div>
    <main className={classes.Content}>
      {props.children}
    </main>
  </Aux>
);

export default layout 