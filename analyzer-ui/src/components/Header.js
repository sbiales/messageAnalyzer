import React, { Component } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Link, withRouter } from "react-router-dom";

class Header extends Component {
    render() {
        return(
            <div style={{width:'100%', marginBottom: 50 }}>
            <AppBar position="static" color="default">
            <Toolbar>
                <Typography variant='h6' style={{flexGrow: 1}}>
                    <Link exact to="/" style={{ textDecoration: 'none', color: 'black' }}>
                        Analyze my messages!
                    </Link>
                </Typography>
                <Typography variant='h6' style={{flexGrow: 1}}>
                    <Link exact to="/" style={{ textDecoration: 'none', color: 'black' }}>
                        How do I download my messages?
                    </Link>
                </Typography>
                <Typography variant='h6' style={{flexGrow: 1}}>
                    <Link exact to="/privacy" style={{ textDecoration: 'none', color: 'black' }}>
                        Privacy
                    </Link>
                </Typography>
            </Toolbar>
            </AppBar>
            </div>
        );
    }
}

export default withRouter(Header);