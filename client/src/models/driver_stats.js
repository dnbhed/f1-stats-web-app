const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper');

const DriverStats = function(){
    this.driver1SpecificTrackStats = {driverCode:"", trackName:"", numberOfStarts: 0, grids: [], finishes: [], finishingStatuses: []}
    this.driver1CareerStats = { driverCode: "", numberStarts: 0, grids: [], finishes: []}
    this.driver2SpecificTrackStats = {}
    this.driver2CareerStats = {}
}


DriverStats.prototype.getData = function () {
        PubSub.subscribe("Drivers-select:driver-drivers-list-1-selected", (event) => {
            const driverID = event.detail;
            const request = new RequestHelper(`http://ergast.com/api/f1/drivers/${driverID}/results.json?limit=1000`);
            request.get().then((data) => {
                const driverStats = data.MRData.RaceTable.Races;
                PubSub.publish('DriverStats:career-stats-1-ready', driverStats)
            })
        })

        PubSub.subscribe("Drivers-select:driver-drivers-list-2-selected", (event) => {
            const driverID = event.detail;
            const request = new RequestHelper(`http://ergast.com/api/f1/drivers/${driverID}/results.json?limit=1000`);
            request.get().then((data) => {
                const driverStats = data.MRData.RaceTable.Races;
                PubSub.publish('DriverStats:career-stats-2-ready', driverStats)
            })
        })
}


module.exports = DriverStats;