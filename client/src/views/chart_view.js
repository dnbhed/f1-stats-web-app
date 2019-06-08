const PubSub = require('../helpers/pub_sub.js');
const Highcharts = require('highcharts');

const ChartView = function(container){
    this.container = container
}

ChartView.prototype.renderChart = function(){
    container = this.container
    var myChart = Highcharts.chart(container, {
        chart: {
            type: 'bar'
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
            name: 'Jane',
            data: [1, 0, 4]
        }, {
            name: 'John',
            data: [5, 7, 3]
        }]
    });
}

module.exports = ChartView;