import React, { Component } from 'react';
import { Typography, Paper } from '@material-ui/core';

class Privacy extends Component {
    render() {
        return(
            <Paper style={{width:'80%'}}>
                <Typography variant='body1' style={{flexGrow: 1, textAlign: 'justify', padding: 10}}>
                    We will not share your data anywhere. By submitting your file, you give permission for us to use your data for research. It will be anonymized by removing the names of the users and saved separately from the metadata you provide.
                </Typography>
                <Typography variant='body1' style={{flexGrow: 1, textAlign: 'justify', margin: 10}}>
                    You will see the names of the users from your file on the results page, but these are not stored or retained anywhere on our server. They are processed out of your file and stored only within your browser, which will be cleared when your browser session ends.
                </Typography>
            </Paper>
        );
    }
}

export default Privacy;