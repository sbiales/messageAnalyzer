import React, { Component } from 'react';
import { Typography, Paper } from '@material-ui/core';

class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
          fileId: null
        };
    }

    render() {
        return(
            <Paper style={{width:'80%'}}>
                <Typography variant='body1' style={{flexGrow: 1}}>
                   The local storage item is {localStorage.getItem('id')}
                </Typography>
            </Paper>
        );
    }
}

export default Results;