const PubSub = require('../helpers/pub_sub.js');
const Highcharts = require('highcharts');

const ChartView = function(container){
    this.container = container;
    this.series = [];
    this.driver1Details = {};
    this.driver2Details = {};
}

ChartView.prototype.bindEvents = function(){
    
    PubSub.subscribe('Drivers:selected-driver-1-details', (event) => {
        this.parseDriver1Details(event.detail[0])
    })
    PubSub.subscribe('Drivers:selected-driver-2-details', (event) => {
        this.parseDriver2Details(event.detail[0])
    })
    // this.renderChart(this.driver1Details.driverName, this.driver2Details.driverName)
    
        // this.renderChart(this.driver1Details.driverName, this.driver2Details.driverName)

    // PubSub.subscribe('Raceresults:race-results-ready', (event) => {
    //     this.populateResults(event.detail)
    // })
    
}

ChartView.prototype.parseDriver1Details = function(driver){
    const driverName = driver.givenName + " " + driver.familyName;
    const driverID = driver.diverId;
    this.driver1Details.driverName = driverName;
    this.driver1Details.driverId = driverID;
    // console.log(this.driver1Details)
}

ChartView.prototype.parseDriver2Details = function(driver){
    const driverName = driver.givenName + " " + driver.familyName;
    const driverID = driver.diverId;
    this.driver2Details.driverName = driverName;
    this.driver2Details.driverId = driverID;
}

ChartView.prototype.renderChart = function(driver1Name, driver2Name){
    const container = this.container
    var myChart = Highcharts.chart(container, {
        chart: {
            type: 'column',
            yAxis: {
                min: 0,
                max: 20,
                minRange:20
            }
        },
        title: {
            text: 'Qualy and Race Results'
        },
        xAxis: {
            categories: ['Qualified', 'Finished']
        },
        yAxis: {
            title: {
                text: 'Position'
            }
        },
        series: [{
            name: `${driver1Name}`,
            data: [1, 0]
        }, {
            name: `${driver2Name}`,
            data: [5, 7]
        }]
    });
}


module.exports = ChartView;