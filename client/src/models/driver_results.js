const PubSub = require('../helpers/pub_sub.js');

const DriverResults = function(){
    this.raceResult = []
    this.qualyResult = []
    this.driver1ID = ''
    this.driver2ID = ''
}

DriverResults.prototype.bindEvents = function(){
    PubSub.subscribe('Drivers:selected-driver-1-details', (event) => {
        PubSub.subscribe('Qualifyingresults:qualifying-results-ready', (event) => {

        })
        this.driver1ID = event.detail[0].driverId
        this.getQualifyingResult1(this.driver1ID);
    })
    PubSub.subscribe('Drivers:selected-driver-2-details', (event) => {
        this.driver2ID = event.detail[0].driverId
        this.getQualifyingResult1(this.driver2ID);
    })
    
}

DriverResults.prototype.getQualifyingResult1 = function(driverIDInput){
    

    const driverID = driverIDInput;
    const qualyResults = event.detail;
    qualyResults.forEach((result) => {
        const driver = result.Driver.driverId;
        if (driver === driverID) {
            console.log(result)
        }
    })
}



module.exports = DriverResults;