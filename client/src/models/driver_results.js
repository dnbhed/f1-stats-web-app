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
                console.log(data);
                // this.driversData = data.MRData.DriverTable.Drivers;
                // PubSub.publish('DriverResults:results-ready', this.driversData)
            })
        })

    })

    

}


module.exports = DriverResults;