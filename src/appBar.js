import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export default function Header(props) {
  return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" noWrap>
            BOOK STORE
          </Typography>
       
        </Toolbar>
      </AppBar>
  );
}