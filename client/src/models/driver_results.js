const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper');


const DriverResults = function(){
    this.driver1Results = {driverCode: "", years: [], grids: [], positions:[]};
    this.driver2Results = {driverCode: "", years: [], grids: [], positions:[]};
}

DriverResults.prototype.getData = function(){
    PubSub.subscribe('RacesSchedules:race-selected', (event) => {
        const circuitID = event.detail;
        PubSub.subscribe("Drivers-select:driver-drivers-list-1-selected", (event) => {
            const driverID = event.detail;
            const request = new RequestHelper(`https://ergast.com/api/f1/drivers/${driverID}/circuits/${circuitID}/results.json`);
            request.get().then((data) => {
                const driverResults = data.MRData.RaceTable.Races;
                PubSub.publish('DriverResults:results-1-ready', driverResults)
            })
        })
    })

    PubSub.subscribe('RacesSchedules:race-selected', (event) => {
        const circuitID = event.detail;
        PubSub.subscribe("Drivers-select:driver-drivers-list-2-selected", (event) => {
            const driverID = event.detail;
            const request = new RequestHelper(`https://ergast.com/api/f1/drivers/${driverID}/circuits/${circuitID}/results.json`);
            request.get().then((data) => {
                const driverResults = data.MRData.RaceTable.Races;
                PubSub.publish('DriverResults:results-2-ready', driverResults)
            })
        })
    })
}






module.exports = DriverResults;