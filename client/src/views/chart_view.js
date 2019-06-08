const PubSub = require('../helpers/pub_sub.js');
const Highcharts = require('highcharts');

const ChartView = function(container){
    this.container = container;
    this.series = [];
    this.driver1Details = {};
    this.driver2Details = {};
}

ChartView.prototype.bindEvents = function(){
    
    
    // this.renderChart(this.driver1Details.driverName, this.driver2Details.driverName)
    
        // this.renderChart(this.driver1Details.driverName, this.driver2Details.driverName)

    // PubSub.subscribe('Raceresults:race-results-ready', (event) => {
    //     this.populateResults(event.detail)
    // })
    
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