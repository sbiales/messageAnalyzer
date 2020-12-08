import React, { Component } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

class Header extends Component {
    render() {
        return(
            <div style={{width:'100%'}}>
            <AppBar position="static" color="default">
            <Toolbar style={{width:'100%'}}>
                <Typography variant='h6' style={{flexGrow: 1}}>How do I download my messages?</Typography>
                <Typography variant='h6' style={{flexGrow: 1}}>Privacy</Typography>
            </Toolbar>
            </AppBar>
            </div>
        );
    }
}

export default Header;