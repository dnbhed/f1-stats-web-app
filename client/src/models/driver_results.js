const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper');


const DriverResults = function(){


}

DriverResults.prototype.getData = function(){

    
        
    PubSub.subscribe('RacesSchedules:race-selected', (event) => {
        const circuitID = event.detail;
        PubSub.subscribe("Drivers-select:driver-drivers-list-1-selected", (event) => {
            const driverID = event.detail;
            const request = new RequestHelper(`http://ergast.com/api/f1/drivers/${driverID}/circuits/${circuitID}/results.json`);
            request.get().then((data) => {
                this.driversResults = data.MRData.RaceTable.Races;
                PubSub.publish('DriverResults:results-1-ready', this.driversResults)
            })
        })

    })
    PubSub.subscribe('RacesSchedules:race-selected', (event) => {
        const circuitID = event.detail;
        PubSub.subscribe("Drivers-select:driver-drivers-list-2-selected", (event) => {
            const driverID = event.detail;
            const request = new RequestHelper(`http://ergast.com/api/f1/drivers/${driverID}/circuits/${circuitID}/results.json`);
            request.get().then((data) => {
                this.driversResults = data.MRData.RaceTable.Races;
                PubSub.publish('DriverResults:results-2-ready', this.driversResults)
            })
        })

    })

    

}


module.exports = DriverResults;