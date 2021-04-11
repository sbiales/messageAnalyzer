import React, { Component } from 'react';
import { Typography, Paper } from '@material-ui/core';
import axios from 'axios';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack, VictoryTooltip, VictoryVoronoiContainer } from 'victory';

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
            loaded: true
        }, this.calculateAverages);
    }

    getResults = async () => {
        var res = await axios({
            method: "GET",
            url: `http://localhost:5000/results/bydatecount/${this.props.fileId}/${this.props.optIn}`,
            headers: {
              'Access-Control-Allow-Origin': '*'
            }
        });
        if (res) {
            //console.log(res)
            return res.data;
        }
    }

    calculateAverages = () => {
        console.log(JSON.stringify(this.state.data));
        var u1 = [];
        var u2 =[];
        var users = Object.values(this.state.data);
        users[0].forEach(day => {
            u1.push(day.total);
        });
        users[1].forEach(day => {
            u2.push(day.total);
        });
        var totalDays = this.getDateRange().length;
        var u1Avg = u1.reduce((a, b) => a + b, 0) / totalDays;
        var u2Avg = u2.reduce((a, b) => a + b, 0) / totalDays;
        console.log(u1.reduce((a, b) => a + b, 0))
        this.setState({
            u1Avg: u1Avg,
            u2Avg: u2Avg
        });
    }

    renderBars = () => {
        var bars = [];
        // if (this.getDateRange().length)
        Object.values(this.state.data).forEach((user) =>{
            console.log(user)
            bars.push(<VictoryBar
                data={user}
                x="date"
                y="total"
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
        return ( !this.state.loaded ? <Paper>Loading...</Paper> :
            <>
            <VictoryChart domainPadding={20} style={{width: '100%'}} containerComponent={
                <VictoryVoronoiContainer
                  labels={({ datum }) => `${datum.date}, ${datum.total}`}
                  labelComponent={
                    <VictoryTooltip
                      style={{ fontSize: 10 }}
                    />}
                />
              }>
                {/*<VictoryAxis
                tickValues={this.getDateRange()}
                />*/}
                <VictoryAxis
                dependentAxis
                // tickFormat specifies how ticks should be displayed
                tickFormat={(x) => x}
                />
                <VictoryStack colorScale={["tomato", "blue"]}>
                    {this.renderBars()}
                    {/*<VictoryBar
                        data={this.state.data[4506756110]}
                        x="date"
                        y="total"
                    />
                    <VictoryBar
                        data={this.state.data[4820498873]}
                        x="date"
                        y="total"
                    />*/}
                </VictoryStack>
            </VictoryChart>
            <Paper>
                <Typography variant='h3'>Average texts per day</Typography>
                <Typography>User 1: {this.state.u1Avg}</Typography>
                <Typography>User 2: {this.state.u2Avg}</Typography>
            </Paper>
            </>
        )
    }
}

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
            <>
            <Paper style={{width:'80%'}}>
                <Typography variant='body1' style={{flexGrow: 1}}>
                   The local storage item is {this.state.fileId}
                </Typography>
                <Date fileId={this.state.fileId} optIn={this.state.optIn} />
            </Paper>
            
            </>
        : '');
    }
}

export default Results;