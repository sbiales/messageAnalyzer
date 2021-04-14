import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Link, withRouter } from "react-router-dom";

class Header extends Component {
    render() {
        return(
            <div style={{width:'100%', marginBottom: 50 }}>
            <AppBar position="static" color="default">
            <Toolbar>
                    <Button component={Link} to={"/"} style={{flexGrow: 1}}>
                        <Typography>Analyze my messages!</Typography>
                    </Button>
                    <Button component={Link} to={"/"} style={{flexGrow: 1}}>
                        <Typography>How do I download my messages?</Typography>
                    </Button>
                    <Button component={Link} to={"/privacy"} style={{flexGrow: 1}}>
                        <Typography>Privacy</Typography>
                    </Button>
            </Toolbar>
            </AppBar>
            </div>
        );
    }
}

export default withRouter(Header);