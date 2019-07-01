const PubSub = require('../helpers/pub_sub.js');
const Highcharts = require('highcharts');


const DriverStatsView = function(container1){
    this.container1 = container1;
    this.driver1SpecificTrackStats = { driverCode: "", trackName: "", numberOfStarts: 0, grids: [], finishes: [], finishingStatuses: [] }
    this.driver1CareerStats = { driverCode: "", numberStarts: 0, grids: [], finishes: [] }
}

DriverStatsView.prototype.bindEvents = function () {
    PubSub.subscribe('DriverResults:results-1-ready', (event) => {
        this.driver1SpecificTrackStats = { driverCode: "", trackName: "", numberOfStarts: 0, grids: [], finishes: [], finishingStatuses: [] }

        this.parseDriver1RacesResults(event.detail)

        

        this.renderChart1();
    });

    // PubSub.subscribe('DriverResults:results-2-ready', (event) => {
    //     this.driver2Results = { driverCode: "Not Selected", years: [], grids: [], positions: [] }

    //     this.parseDriver2RacesResults(event.detail)

    //     this.renderChart2();
    // });
}

DriverStatsView.prototype.parseDriver1RacesResults = function (results) {
    const firstRace = results[0]
    const driverCode = firstRace.Results[0].Driver.code;
    const trackName = firstRace.Circuit.circuitName;
    
    this.driver1SpecificTrackStats.driverCode = driverCode;
    this.driver1SpecificTrackStats.trackName = trackName;
    this.driver1SpecificTrackStats.numberOfStarts = 0;
    this.driver1SpecificTrackStats[driverCode] = []
    results.forEach((race) => {this.driver1SpecificTrackStats
        this.driver1SpecificTrackStats.numberOfStarts += 1;

        const finishingStatus = race.Results[0].status;
        this.driver1SpecificTrackStats.finishingStatuses.push(finishingStatus);

        // const grid = parseInt(race.Results[0].grid);
        // const p = `P${grid}`;
        // if (this.driver1SpecificTrackStats.grids.find([p]) ){}
        // const num;
        // const result = [p, num + 1]
        // this.driver1SpecificTrackStats.grids.push(grid);

        const position = parseInt(race.Results[0].position);
        this.driver1SpecificTrackStats.finishes.push(position);
    })
}

DriverStatsView.prototype.renderChart1 = function(){
    console.log(this.driver1SpecificTrackStats)
    Highcharts.chart(this.container1, {
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45
            }
        },
        title: {
            text: `${this.driver1SpecificTrackStats.driverCode} @ ${this.driver1SpecificTrackStats.trackName}`
  },
        subtitle: {
            text: `in ${this.driver1SpecificTrackStats.numberOfStarts} starts`
        },
        plotOptions: {
            pie: {
                innerSize: 100,
                depth: 45
            }
        },
        series: [{
            name: 'Grid Results',
            size: 150,
            center: [100, 100],
            data: this.driver1SpecificTrackStats.grid     
        }],
        series: [{
            name: 'Finishing Positions',
            size: 150,
            center: [100, 100],
            data: this.driver1SpecificTrackStats.finishes     
        }]
    });


}

module.exports = DriverStatsView;