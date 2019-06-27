const PubSub = require('../helpers/pub_sub.js');
const Highcharts = require('highcharts');

const RaceChartView = function(container1, container2){
    this.container1 = container1;
    this.container2 = container2;
    this.driver1Results = { driverCode: "Not Selected", track: "", years: [], grids: [], positions: [] };
    this.driver2Results = { driverCode: "Not Selected", track: "", years: [], grids: [], positions: [] };    
}

RaceChartView.prototype.bindEvents = function(){
    PubSub.subscribe('DriverResults:results-1-ready', (event) => {
        this.driver1Results = { driverCode: "Not Selected", years: [], grids: [], positions: [] }

        this.parseDriver1RacesResults(event.detail)
        
        this.renderChart1();
    });

    PubSub.subscribe('DriverResults:results-2-ready', (event) => {
        this.driver2Results = { driverCode: "Not Selected", years: [], grids: [], positions: [] }

        this.parseDriver2RacesResults(event.detail)  

        this.renderChart2();
    });
}

RaceChartView.prototype.parseDriver1RacesResults = function (results) {
    const firstRace = results[0]
    const driverCode = firstRace.Results[0].Driver.code;
    const trackName = firstRace.Circuit.circuitName;
    this.driver1Results.driverCode = driverCode;
    this.driver1Results.track = trackName;
    this.driver1Results[driverCode] = []
    results.forEach((race) => {
        const season = parseInt(race.season);
        this.driver1Results.years.push(season);

        const grid = parseInt(race.Results[0].grid);
        this.driver1Results.grids.push(grid);

        const position = parseInt(race.Results[0].position);
        this.driver1Results.positions.push(position);
    })
}

RaceChartView.prototype.parseDriver2RacesResults = function (results) {
    const firstRace = results[0]
    const driverCode = firstRace.Results[0].Driver.code;
    const trackName = firstRace.Circuit.circuitName;
    this.driver2Results.driverCode = driverCode;
    this.driver2Results.track = trackName;
    this.driver2Results[driverCode] = []
    results.forEach((race) => {
        const season = parseInt(race.season);
        this.driver2Results.years.push(season);

        const grid = parseInt(race.Results[0].grid);
        this.driver2Results.grids.push(grid);

        const position = parseInt(race.Results[0].position);
        this.driver2Results.positions.push(position);
    })
}

// RaceChartView.prototype.parseDriver1RacesResults = function(result){
//     this.driver1Results = result;
// }

// RaceChartView.prototype.parseDriver2RacesResults = function(result){
//     this.driver2Results = result;
// }

RaceChartView.prototype.renderChart1 = function(){
    const driver1Code = this.driver1Results.driverCode

    const track = this.driver1Results.track
    
    const driver1Years = this.driver1Results.years

    const driver1Grids = this.driver1Results.grids

    const driver1Positions = this.driver1Results.positions


    Highcharts.chart(this.container1, {
        chart: {
            zoomType: 'xy'
        },
        title: {
            text: `${driver1Code} Results @ ${track}`,
            align: 'center'
        },
        subtitle: {
            text: 'Source: ergast.com',
            align: 'center'
        },
        xAxis: [{
            reversed: false,
            categories: driver1Years,
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
        }
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
            name: `${driver1Code} Grid Position`,
            type: 'line',
            yAxis: 0,
            data: driver1Grids,
            marker: {
                enabled: true
            },
            tooltip: {
                valuePrefix: 'P'
            }
        }, 
            {
                name: `${driver1Code} Finishing Position`,
                type: 'line',
                yAxis: 0,
                data: driver1Positions,
                marker: {
                    enabled: true
                },
                tooltip: {
                    valuePrefix: 'P'
                }
            }
    ],
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
RaceChartView.prototype.renderChart2 = function(){
    const driver2Code = this.driver2Results.driverCode

    const track = this.driver2Results.track

    const driver2Years = this.driver2Results.years

    const driver2Grids = this.driver2Results.grids

    const driver2Positions = this.driver2Results.positions


    Highcharts.chart(this.container2, {
        chart: {
            zoomType: 'xy'
        },
        title: {
            text: `${driver2Code} Results @ ${track}`,
            align: 'center'
        },
        subtitle: {
            text: 'Source: ergast.com',
            align: 'center'
        },
        xAxis: [{
            reversed: false,
            categories: driver2Years,
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
        }
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
            name: `${driver2Code} Grid Position`,
            type: 'line',
            yAxis: 0,
            data: driver2Grids,
            marker: {
                enabled: true
            },
            tooltip: {
                valuePrefix: 'P'
            }
        }, 
         
         {
            name: `${driver2Code} Finishing Position`,
            type: 'line',
            yAxis: 0,
            data: driver2Positions,
            marker: {
                enabled: true
            },
            tooltip: {
                valuePrefix: 'P'
            }
        }
    ],
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

// RaceChartView.prototype.defineYears = function(d1years, d2years){
//     if(d1years.length >= d2years.length){
//         return d1years;
//     } else {
//         return d2years;
//     }
// }

// RaceChartView.prototype.populateResultsArraysCorrectly = function(array, yearArray){
//     const newArray = array;
//     if(array.length < yearArray.length){
//         const j = yearArray.length - array.length;
//         for(i = 0; i < j; i++){
//             newArray.unshift(null)
//         }
//     }
//     return newArray;
// }

module.exports = RaceChartView;