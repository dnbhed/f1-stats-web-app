const PubSub = require('../helpers/pub_sub.js');
const Highcharts = require('highcharts');

const ChartView = function(container){
    this.container = container;
    this.series = []
    this.driver1Name = ''
    this.driver2Name = ''
}

ChartView.prototype.bindEvents = function(){
    
    PubSub.subscribe('Drivers:selected-driver-1-details', (event) => {
        this.driver1Name = this.parseDriverDetails(event.detail[0])
        this.renderChart(this.driver1Name, this.driver2Name)
    })
    PubSub.subscribe('Drivers:selected-driver-2-details', (event) => {
        this.driver2Name = this.parseDriverDetails(event.detail[0])
        this.renderChart(this.driver1Name, this.driver2Name)
    })
    
    
}

ChartView.prototype.parseDriverDetails = function(driver){
    const driverName = driver.givenName + " " + driver.familyName;
    return driverName;
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