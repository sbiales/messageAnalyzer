import React, { Component } from 'react';
import { Typography, Paper, Grid } from '@material-ui/core';
import axios from 'axios';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLegend, VictoryStack, VictoryTooltip, VictoryVoronoiContainer } from 'victory';
import ReactWordcloud from 'react-wordcloud';
import '../App.css';
import Config from '../config';

class Emoji extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: false
        }
    }

    componentDidMount = async () => {
        this.setState({
            data: await this.getResults(),
            user1: localStorage.getItem('user1'),
            user2: localStorage.getItem('user2'),
            loaded: true
        });
    }

    getResults = async () => {
        var res = await axios({
            method: "GET",
            url: `${Config.api}/results/topemoji/${this.props.fileId}`,
            headers: {
              'Access-Control-Allow-Origin': '*'
            }
        });
        if (res) {
            return res.data;
        }
    }

    render() {
        return ( !this.state.loaded ? <Paper>Loading...</Paper> :
            <Paper>
                <Typography variant='h4'>Top Emoji</Typography>
                <Typography>{this.state.user1}: {this.state.data.user1}</Typography>
                <Typography>{this.state.user2}: {this.state.data.user2}</Typography>
            </Paper>
        )
    }
}

class Wordcloud extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: false
        }
    }

    componentDidMount = async () => {
        this.setState({
            data: await this.getResults(),
            loaded: true
        });
    }

    getResults = async () => {
        var res = await axios({
            method: "GET",
            url: `${Config.api}/results/wordcloud/${this.props.fileId}`,
            headers: {
              'Access-Control-Allow-Origin': '*'
            }
        });
        if (res) {
            return res.data.data;
        }
    }

    render() {
        const options = {
            rotations: 2,
            rotationAngles: [-90, 0],
            fontSizes: [8, 64],
            deterministic: true,
        };
        return ( !this.state.loaded ? <Paper>Loading...</Paper> :
            <Paper style={{overflowX: 'hidden', whiteSpace: 'nowrap'}}>
                <Typography variant='h4'>Word cloud</Typography>
                <div className='wordcloud'>
                    <ReactWordcloud
                    words={this.state.data}
                    options={options}
                    />
                </div>
            </Paper>
        )
    }
}

class Hour extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: false
        }
    }

    componentDidMount = async () => {
        this.setState({
            data: await this.getResults(),
            loaded: true
        });
    }

    getResults = async () => {
        var res = await axios({
            method: "GET",
            url: `${Config.api}/results/byhourcount/${this.props.fileId}`,
            headers: {
              'Access-Control-Allow-Origin': '*'
            }
        });
        if (res) {
            return res.data.data;
        }
    }

    render() {
        return ( !this.state.loaded ? <Paper>Loading...</Paper> :
            <Paper>
                <Typography variant='h4'>Texts by hour</Typography>
            <VictoryChart domainPadding={20} style={{width: '100%'}}>
            <VictoryAxis
                dependentAxis
                // tickFormat specifies how ticks should be displayed
                tickFormat={(x) => x}
                />
                <VictoryAxis
                tickFormat={(x) => x}
                style={{tickLabels: {angle: 60, fontSize: '12px'} }}
                />
                <VictoryBar
                data={this.state.data}
                x="hour"
                y="texts"
                style={{ data: { fill: "tomato" } }}
                />
            </VictoryChart>
            </Paper>
        )
    }
}

class Date extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            u1Avg: null,
            u2Avg: null,
            loaded: false
        }
    }

    componentDidMount = async () => {
        this.setState({
            data: await this.getResults(),
            user1: localStorage.getItem('user1'),
            user2: localStorage.getItem('user2'),
            loaded: true
        }, this.calculateAverages);
    }

    getResults = async () => {
        var res = await axios({
            method: "GET",
            url: `${Config.api}/results/bydatecount/${this.props.fileId}`,
            headers: {
              'Access-Control-Allow-Origin': '*'
            }
        });
        if (res) {
            console.log(res)
            return res.data;
        }
    }

    calculateAverages = () => {
        var u1 = [];
        var u2 =[];
        this.state.data.user1.forEach(day => {
            u1.push(day.total);
        });
        this.state.data.user2.forEach(day => {
            u2.push(day.total);
        });
        var totalDays = this.getDateRange().length;
        var u1Avg = u1.reduce((a, b) => a + b, 0) / totalDays;
        var u2Avg = u2.reduce((a, b) => a + b, 0) / totalDays;
        this.setState({
            u1Avg: Math.round(u1Avg),
            u2Avg: Math.round(u2Avg)
        });
    }

    renderBars = () => {
        var bars = [];
        // if (this.getDateRange().length)
        Object.values(this.state.data).forEach((user) =>{
            bars.push(<VictoryBar
                data={user}
                x="date"
                y="total"
                key={user}
            />);
        });
        return bars;
    }

    getDateRange = () => {
        var dates = []
        Object.values(this.state.data).forEach((user) =>{
            dates = dates.concat(user.map(value => value.date));
        });
        dates = [...new Set(dates)];
        return dates;
    }

    render() {
        return (!this.state.loaded ? <Grid item xs={6}><Paper>Loading...</Paper></Grid> :
            <>
                <Grid item xs={6}>
                    <Paper>
                        <Typography variant='h4'>Texts per person each day</Typography>
                        <VictoryChart domainPadding={20} style={{ width: '100%' }} containerComponent={
                            <VictoryVoronoiContainer
                                labels={({ datum }) => `${datum.date}, ${datum.total}`}
                                labelComponent={
                                    <VictoryTooltip
                                        style={{ fontSize: 10 }}
                                    />}
                            />
                        }>
                            <VictoryLegend
                                data={[
                                    {
                                        name: this.state.user1,
                                        labels: { fill: "tomato", fontSize: 12 },
                                        symbol: { fill: "tomato" }
                                    },
                                    {
                                        name: this.state.user2,
                                        labels: { fill: "blue", fontSize: 12 },
                                        symbol: { fill: "blue" }
                                    }
                                ]}
                            />
                            <VictoryAxis
                                dependentAxis
                                // tickFormat specifies how ticks should be displayed
                                tickFormat={(x) => x}
                            />
                            <VictoryAxis
                                tickFormat={(x) => x}
                                fixLabelOverlap={true}
                                style={{ tickLabels: { angle: 60, fontSize: '10px', padding: 20 } }}
                            />
                            <VictoryStack colorScale={["tomato", "blue"]}>
                                {this.renderBars()}
                            </VictoryStack>
                        </VictoryChart>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper>
                        <Typography variant='h4'>Average texts per day</Typography>
                        <Typography>{this.state.user1}: {this.state.u1Avg}</Typography>
                        <Typography>{this.state.user2}: {this.state.u2Avg}</Typography>
                    </Paper>
                </Grid>
            </>
        )
    }
}

export {
    Hour,
    Date,
    Wordcloud,
    Emoji
};