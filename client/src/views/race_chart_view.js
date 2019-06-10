const PubSub = require('../helpers/pub_sub.js');
const Highcharts = require('highcharts');

const RaceChartView = function(container){
    this.container = container;
    this.series = [];
}

RaceChartView.prototype.bindEvents = function(){
    const driversResults = [];
    PubSub.subscribe('Results:quali-result-driver-1', (event) => {
        const qualiResult = this.parseDriverQualiResults(event.detail)
        driversResults.push(qualiResult)
    });

    PubSub.subscribe('Results:race-result-driver-1', (event) => {
        const raceResult = this.parseDriverRaceResults(event.detail)
        driversResults.push(raceResult)
        this.renderChart(driversResults)
    });

    PubSub.subscribe('Results:quali-result-driver-2', (event) => {
        const qualiResult = this.parseDriverQualiResults(event.detail)
        driversResults.push(qualiResult)
    });

    PubSub.subscribe('Results:race-result-driver-2', (event) => {
        const raceResult = this.parseDriverRaceResults(event.detail)
        driversResults.push(raceResult)
        this.renderChart(driversResults)
    });
}

RaceChartView.prototype.parseDriverQualiResults = function(result){
    const qResult = {};
    const driverCode = result.Driver.code;
    const q1 = result.Q1;
    const q2 = result.Q2;
    const q3 = result.Q3;
    const grid = result.position;
    qResult.driverCode = driverCode;
    qResult.q1 = q1;
    qResult.q2 = q2;
    qResult.q3 = q3;
    qResult.grid = grid;
    return qResult;
}

RaceChartView.prototype.parseDriverRaceResults = function(result){
    const raceResult = {};
    const finishingPosition = result.position;
    const points = result.points;
    raceResult.finishingPosition = finishingPosition;
    raceResult.points = points;
    return raceResult;
}

RaceChartView.prototype.renderChart = function(results){
    const container = this.container
    console.log(results)
    const driver1Qualy = results[0];
    const driver1Race = results[1];
    const driver2Qualy = results[2];
    const driver2Race = results[3];
    console.log(driver1Qualy)

    const driver1Code = driver1Qualy.driverCode;
    const driver1Q1 = parseFloat(driver1Qualy.q1);
    const driver1Q2 = parseFloat(driver1Qualy.q2);
    const driver1Q3 = parseFloat(driver1Qualy.q3);
    const driver1Grid = parseInt(driver1Qualy.grid);
    const driver1Finish = parseInt(driver1Race.finishingPosition);
    const driver1Points = parseInt(driver1Race.points);

    const driver2Code = driver2Qualy.driverCode;
    const driver2Q1 = parseFloat(driver2Qualy.q1);
    const driver2Q2 = parseFloat(driver2Qualy.q2);
    const driver2Q3 = parseFloat(driver2Qualy.q3);
    const driver2Grid = parseInt(driver2Qualy.grid);
    const driver2Finish = parseInt(driver2Race.finishingPosition);
    const driver2Points = parseInt(driver2Race.points);

    // var myChart = Highcharts.chart(container, {    

    //     chart: {
    //         yAxis: {
    //             min: 0,
    //             max: 20,
    //             minRange:20
    //         }
    //     },
    //     title: {
    //         text: 'Qualy and Race Results'
    //     },
    //     xAxis: {
    //         categories: ['Q1', 'Q2', 'Q3','Grid', 'Finished', 'Points']
    //     },
    //     yAxis: {
    //         title: {
    //             text: 'Position'
    //         }
    //     },
    //     series: [{
    //         type: "column",
    //         name: driver1Code,
    //         data: [driver1Q1, driver1Q2, driver1Q3, driver1Grid, driver1Finish, driver1Points]
    //     }, {
    //         type: "column",
    //         name: driver2Code,
    //         data: [driver2Q1, driver2Q2, driver2Q3, driver2Grid, driver2Finish, driver2Points]
    //     }]
    // });


    Highcharts.chart(container, {
        chart: {
            zoomType: 'xy'
        },
        title: {
            text: `${driver1Code} vs ${driver2Code}`,
            align: 'center'
        },
        subtitle: {
            text: 'Source: ergast.com',
            align: 'center'
        },
        xAxis: [{
            // categories: ['Q1', 'Q2', 'Q3', 'Grid', 'Finished', 'Points'],
            categories: [`${driver1Code}`, `${driver2Code}`],
            crosshair: true
        }],
        yAxis: [{ // Primary yAxis
            labels: {
                format: 'time',
                style: {
                    color: Highcharts.getOptions().colors[2]
                }
            },
            title: {
                text: 'Time(s)',
                style: {
                    color: Highcharts.getOptions().colors[2]
                }
            },
            opposite: true

        }, { // Secondary yAxis
            gridLineWidth: 0,
            title: {
                text: 'Position',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                format: 'P',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            }

        }, { // Tertiary yAxis
            gridLineWidth: 0,
            title: {
                text: 'Points',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            labels: {
                format: '{value} Points',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            opposite: true
        }],
        tooltip: {
            shared: true
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            x: 80,
            verticalAlign: 'top',
            y: 55,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || 'rgba(255,255,255,0.25)'
        },
        series: [{
            name: 'q1 time',
            type: 'column',
            yAxis: 1,
            data: [driver1Q1, driver2Q1],
            tooltip: {
                valueSuffix: ' '
            }

        },
        {
            name: 'q2 time',
            type: 'column',
            yAxis: 1,
            data: [driver1Q2, driver2Q2],
            tooltip: {
                valueSuffix: ' '
            }

        },
        {
            name: 'q3 time',
            type: 'column',
            yAxis: 1,
            data: [driver1Q3, driver2Q3],
            tooltip: {
                valueSuffix: ' '
            }

        },
         {
            name: 'Grid Position',
            type: 'column',
            yAxis: 2,
            data: [driver1Grid, driver2Grid],
            marker: {
                enabled: false
            },
            tooltip: {
                valuePrefix: 'P '
            }

        }, 
         {
            name: 'Finishing Position',
            type: 'column',
            yAxis: 2,
            data: [driver1Finish, driver2Finish],
            marker: {
                enabled: false
            },
            tooltip: {
                valuePrefix: 'P '
            }

        }, 
        
        {
            name: 'Points',
            type: 'column',
            data: [driver1Points, driver2Points],
            tooltip: {
                valueSuffix: ' points'
            }
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        floating: false,
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom',
                        x: 0,
                        y: 0
                    }
                }
            }]
        }
    });

}



module.exports = RaceChartView;