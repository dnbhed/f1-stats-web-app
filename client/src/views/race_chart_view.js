const PubSub = require('../helpers/pub_sub.js');
const Highcharts = require('highcharts');

const RaceChartView = function(container){
    this.container = container;
    this.series = [];
    this.results = {
        qResult1:
        {
        driverCode: "Not Selected",
        q1: 0,
        q2: 0,
        q3: 0
        },
        raceResult1: 
        {
        grid: 0,
        finishingPosition: 0,
        points: 0
        },
        qResult2:
        {
        driverCode: "Not Selected",
        q1: 0,
        q2: 0,
        q3: 0
        },
        raceResult2:{
        grid: 0,
        finishingPosition: 0,
        points: 0
        } 
    }
}

RaceChartView.prototype.bindEvents = function(){
    PubSub.subscribe('Results:quali-result-driver-1', (event) => {
        this.parseDriverQualiResults1(event.detail)
        this.renderChart();
    });

    PubSub.subscribe('Results:race-result-driver-1', (event) => {
        this.parseDriverRaceResults1(event.detail)
        this.renderChart();
    });

    PubSub.subscribe('Results:quali-result-driver-2', (event) => {
        this.parseDriverQualiResults2(event.detail)
        this.renderChart();
        // if (qualiResult) {driversResults.push(qualiResult)}
    });

    PubSub.subscribe('Results:race-result-driver-2', (event) => {
        this.parseDriverRaceResults2(event.detail)
        this.renderChart();
        // driversResults.push(raceResult)
        // this.renderChart(driversResults)
    });
}

RaceChartView.prototype.parseDriverQualiResults1 = function(result){
    this.results.qResult1 = {};
    const driverCode = result.Driver.code;
    const q1 = result.Q1;
    const q2 = result.Q2;
    const q3 = result.Q3;
    const grid = result.position;
    this.results.qResult1.driverCode = driverCode;
    this.results.qResult1.q1 = q1;
    this.results.qResult1.q2 = q2;
    this.results.qResult1.q3 = q3;
    this.results.qResult1.grid = grid;
}
RaceChartView.prototype.parseDriverQualiResults2 = function(result){
    this.results.qResult2 = {};
    const driverCode = result.Driver.code;
    const q1 = result.Q1;
    const q2 = result.Q2;
    const q3 = result.Q3;
    const grid = result.position;
    this.results.qResult2.driverCode = driverCode;
    this.results.qResult2.q1 = q1;
    this.results.qResult2.q2 = q2;
    this.results.qResult2.q3 = q3;
    this.results.qResult2.grid = grid;
}

RaceChartView.prototype.parseDriverRaceResults1 = function(result){
    this.results.raceResult1 = {};
    const finishingPosition = result.position;
    const points = result.points;
    this.results.raceResult1.finishingPosition = finishingPosition;
    this.results.raceResult1.points = points;
}

RaceChartView.prototype.parseDriverRaceResults2 = function(result){
    this.results.raceResult2 = {};
    const finishingPosition = result.position;
    const points = result.points;
    this.results.raceResult2.finish = finishingPosition;
    this.results.raceResult2.points = points;
}

RaceChartView.prototype.renderChart = function(){
    

    const container = this.container;

    const driver1Qualy = this.results.qResult1;
    const driver1Race = this.results.raceResult1;
    const driver2Qualy = this.results.qResult2;
    const driver2Race = this.results.raceResult2;

    driver1Code = driver1Qualy.driverCode;
    driver1Q1 = parseFloat(driver1Qualy.q1);
    driver1Q2 = parseFloat(driver1Qualy.q2);
    driver1Q3 = parseFloat(driver1Qualy.q3);
    driver1Grid = parseInt(driver1Qualy.grid);
    driver1Finish = parseInt(driver1Race.finishingPosition);
    driver1Points = parseInt(driver1Race.points);

    driver2Code = driver2Qualy.driverCode;
    driver2Q1 = parseFloat(driver2Qualy.q1);
    driver2Q2 = parseFloat(driver2Qualy.q2);
    driver2Q3 = parseFloat(driver2Qualy.q3);
    driver2Grid = parseInt(driver2Qualy.grid);
    driver2Finish = parseInt(driver2Race.finishingPosition);
    driver2Points = parseInt(driver2Race.points);

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