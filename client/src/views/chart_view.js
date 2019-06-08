const PubSub = require('../helpers/pub_sub.js');
const Highcharts = require('highcharts');

const ChartView = function(container){
    this.container = container;
    this.series = []
}

ChartView.prototype.renderChart = function(){
    container = this.container
    PubSub.subscribe('Drivers-select:driver-1-selected', (event) => {
        const driverID = event.detail
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
                name: `${driverID}`,
                data: [1, 0, 4]
            }, {
                name: 'John',
                data: [5, 7, 3]
            }]
        });
    })
}

module.exports = ChartView;