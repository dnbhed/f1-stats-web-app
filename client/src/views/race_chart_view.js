const PubSub = require('../helpers/pub_sub.js');
const Highcharts = require('highcharts');

const RaceChartView = function(container){
    this.container = container;
    this.driver1Results = { driverCode: "Not Selected", years: [], grids: [], positions: [] };
    this.driver2Results = { driverCode: "Not Selected", years: [], grids: [], positions: [] }; 
    
}

RaceChartView.prototype.bindEvents = function(){
    PubSub.subscribe('DriverResults:results-1-ready', (event) => {
        this.parseDriver1RacesResults(event.detail)
        
        this.renderChart();
    });

    PubSub.subscribe('DriverResults:results-2-ready', (event) => {
        this.parseDriver2RacesResults(event.detail)  

        this.renderChart();
    });
}


RaceChartView.prototype.parseDriver1RacesResults = function(result){
    this.driver1Results = result;
    console.log(this.driver1Results)
    console.log(this.driver2Results)
}

RaceChartView.prototype.parseDriver2RacesResults = function(result){
    this.driver2Results = result;
    console.log(this.driver1Results)
    console.log(this.driver2Results)
}

RaceChartView.prototype.renderChart = function(){
    const driver1Code = this.driver1Results.driverCode
    const driver2Code = this.driver2Results.driverCode

    // console.log(driver1Code)
    // console.log(driver2Code)
    
    const driver1Years = this.driver1Results.years
    const driver2Years = this.driver2Results.years

    // console.log(driver1Years)
    // console.log(driver2Years)

    const driver1Grids = this.driver1Results.grids
    const driver2Grids = this.driver2Results.grids

    // console.log(driver1Grids)
    // console.log(driver2Grids)


    const driver1Positions = this.driver1Results.positions
    const driver2Positions = this.driver2Results.positions

    // console.log(driver1Positions)
    // console.log(driver2Positions)

    const chosenYears = this.defineYears(driver1Years, driver2Years)

    Highcharts.chart(this.container, {
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
            categories: chosenYears,
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
                valuePrefix: 'P '
            }
        }, 
         {
            name: `${driver2Code} Grid Position`,
            type: 'line',
            yAxis: 0,
            data: driver2Grids,
            marker: {
                enabled: true
            },
            tooltip: {
                valuePrefix: 'P '
            }
        }, 
         {
            name: `${driver1Code} Grid Position`,
            type: 'line',
            yAxis: 0,
            data: driver1Positions,
            marker: {
                enabled: true
            },
            tooltip: {
                valuePrefix: 'P '
            }
        },
         {
            name: `${driver2Code} Grid Position`,
            type: 'line',
            yAxis: 0,
            data: driver2Positions,
            marker: {
                enabled: true
            },
            tooltip: {
                valuePrefix: 'P '
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

RaceChartView.prototype.defineYears = function(d1years, d2years){
    if(d1years.length >= d2years.length){
        return d1years
    }else {
        return d2years
    }
}


module.exports = RaceChartView;