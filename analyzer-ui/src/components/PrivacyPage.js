import React, { Component } from 'react';
import { Typography, Paper } from '@material-ui/core';

class Privacy extends Component {
    render() {
        return(
            <Paper style={{width:'80%'}}>
                <Typography variant='body1' style={{flexGrow: 1}}>
                    We will not share your data anywhere. If you opt in to let us use your data for research, it will be anonymized by removing the names of the users and saved separately from the metadata.
                </Typography>
            </Paper>
        );
    }
}

export default Privacy;