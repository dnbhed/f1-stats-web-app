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
        this.renderChart(this.driver1Details.driverName, this.driver2Details.driverName)
    })
    PubSub.subscribe('Drivers:selected-driver-2-details', (event) => {
        this.parseDriver2Details(event.detail[0])
        this.renderChart(this.driver1Details.driverName, this.driver2Details.driverName)
    })
    
    
    PubSub.subscribe('Raceresults:race-results-ready', (event) => {
        console.log(event.detail)
    })
    
}

ChartView.prototype.parseDriver1Details = function(driver){
    const driverName = driver.givenName + " " + driver.familyName;
    const driverID = driver.diverId;
    this.driver1Details.driverName = driverName;
    this.driver1Details.driverId = driverID;
    console.log(this.driver1Details)
}

ChartView.prototype.parseDriver2Details = function(driver){
    const driverName = driver.givenName + " " + driver.familyName;
    const driverID = driver.diverId;
    this.driver2Details.driverName = driverName;
    this.driver2Details.driverId = driverID;
}

ChartView.prototype.renderChart = function(driver1Name, driver2Name){
    const container = this.container
    console.log('drivers names', driver1Name);
    
    var myChart = Highcharts.chart(container, {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Fruit Consumption'
        },
        xAxis: {
            categories: ['Apples', 'Bananas', 'Oranges']
        },
        yAxis: {
            title: {
                text: 'Fruit eaten'
            }
        },
        series: [{
            name: `${driver1Name}`,
            data: [1, 0, 4]
        }, {
            name: `${driver2Name}`,
            data: [5, 7, 3]
        }]
    });
}


module.exports = ChartView;