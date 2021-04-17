import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { Hour, Date, Wordcloud, Emoji } from './ResultComponents';

class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
          fileId: null,
          optIn: null,
          loaded: false
        };
    }

    componentDidMount() {
        this.setState({
            fileId: localStorage.getItem('id'),
            optIn: localStorage.getItem('optIn'),
            loaded: true
        });
    }

    render() {
        return( this.state.loaded ?
            <div style={{ width: '95%', padding: 20 }}>
            <Grid container spacing={3}>
                <Grid item xs={6} s={6}>
                    <Hour fileId={this.state.fileId} optIn={this.state.optIn}/>
                </Grid>
                    <Date fileId={this.state.fileId} optIn={this.state.optIn} />

                <Grid item xs={6} s={6}>
                    <Emoji fileId={this.state.fileId} optIn={this.state.optIn}/>
                </Grid>
                <Grid item xs={12}>
                    <Wordcloud fileId={this.state.fileId} optIn={this.state.optIn}/>
                </Grid>
            </Grid>
            </div>
        : '');
    }
}

export default Results;