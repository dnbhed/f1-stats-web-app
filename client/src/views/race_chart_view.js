const PubSub = require('../helpers/pub_sub.js');
const Highcharts = require('highcharts');

const RaceChartView = function(container){
    this.container = container;
    this.results = {
        qResult1:
            { driverCode: "Not Selected", grid: 1},
        raceResult1: 
            { finishingPosition: 1, points: 25},
        qResult2:
            { driverCode: "Not Selected", grid: 20},
        raceResult2:
            { finishingPosition: 20, points: 0} 
    }
}

RaceChartView.prototype.bindEvents = function(){
    this.renderChart();
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
    });

    PubSub.subscribe('Results:race-result-driver-2', (event) => {
        this.parseDriverRaceResults2(event.detail)
        this.renderChart();

    });
}

RaceChartView.prototype.parseDriverQualiResults1 = function(result){
    this.results.qResult1 = {};
    const driverCode = result.Driver.code;
    const grid = result.position;
    this.results.qResult1.driverCode = driverCode;
    this.results.qResult1.grid = grid;
}
RaceChartView.prototype.parseDriverQualiResults2 = function(result){
    this.results.qResult2 = {};
    const driverCode = result.Driver.code;
    const grid = result.position;
    this.results.qResult2.driverCode = driverCode;
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
    driver1Grid = parseInt(driver1Qualy.grid);
    console.log(driver1Grid)
    driver1Finish = parseInt(driver1Race.finishingPosition);
    driver1Points = parseInt(driver1Race.points);

    driver2Code = driver2Qualy.driverCode;
    driver2Grid = parseInt(driver2Qualy.grid);
    driver2Finish = parseInt(driver2Race.finishingPosition);
    driver2Points = parseInt(driver2Race.points);

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
        yAxis: [{ 
            reversed: true,
            gridLineWidth: 0,
            title: {
                text: 'Position',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                format: 'P{value} ',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            min: 1, 
            max: 20 


        }, { 
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
            opposite: true,
                min: 0,
                max: 25
        }, 
         ],
        tooltip: {
            shared: true
        },
        legend: {
            layout: 'vertical',
            align: 'center',
            x: 80,
            verticalAlign: 'top',
            y: 55,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || 'rgba(255,255,255,0.25)'
        },
        series: [
         {
            name: 'Grid Position',
            type: 'scatter',
            yAxis: 0,
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
            type: 'scatter',
            yAxis: 0,
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
            yAxis: 1,
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