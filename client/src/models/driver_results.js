const PubSub = require('../helpers/pub_sub.js');

const DriverResults = function(){
    this.raceResult = []
    this.qualyResult = []
    this.driver1ID = ''
    this.driver2ID = ''
}

DriverResults.prototype.bindEvents = function(){

    PubSub.subscribe('Qualifyingresults:qualifying-results-ready', (event) => {
        qualiResult = event.detail
        PubSub.subscribe('Drivers:selected-driver-1-details', (event) => {

            this.driver1ID = event.detail[0].driverId
            this.selectQualifyingResult1(this.driver1ID, qualiResult);
        })
        PubSub.subscribe('Drivers:selected-driver-2-details', (event) => {
            this.driver2ID = event.detail[0].driverId
            this.selectQualifyingResult2(this.driver2ID, qualiResult);
        })
    })

    PubSub.subscribe('Raceresults:race-results-ready', (event) => {
        raceResult = event.detail
        PubSub.subscribe('Drivers:selected-driver-1-details', (event) => {

            this.driver1ID = event.detail[0].driverId
            this.selectRaceResult1(this.driver1ID, raceResult);
        })
        PubSub.subscribe('Drivers:selected-driver-2-details', (event) => {
            this.driver2ID = event.detail[0].driverId
            this.selectRaceResult2(this.driver2ID, raceResult);
        })
    })
    
    
}

DriverResults.prototype.selectQualifyingResult1 = function(driverIDInput, qualyResult){
    const driverID = driverIDInput;
    const qualyResults = qualyResult;
    qualyResults.forEach((result) => {
        const driver = result.Driver.driverId;
        if (driver === driverID) {
            this.publishQualifyingResult1(result)
        }
    })
}

DriverResults.prototype.publishQualifyingResult1 = function(result){
    PubSub.publish('Results:quali-result-driver-1', result)
}

DriverResults.prototype.selectQualifyingResult2 = function(driverIDInput, qualyResult){
    const driverID = driverIDInput;
    const qualyResults = qualyResult;
    qualyResults.forEach((result) => {
        const driver = result.Driver.driverId;
        if (driver === driverID) {
            this.publishQualifyingResult2(result)
        }
    })
}

DriverResults.prototype.publishQualifyingResult2 = function(result){
    PubSub.publish('Results:quali-result-driver-2', result)
}

DriverResults.prototype.selectRaceResult1 = function(driverIDInput, raceResult){
    const driverID = driverIDInput;
    const raceResults = raceResult;
    raceResults.forEach((result) => {
        const driver = result.Driver.driverId;
        if (driver === driverID) {
            this.publishRaceResult1(result)
        }
    })
}

DriverResults.prototype.publishRaceResult1 = function(result){
    PubSub.publish('Results:race-result-driver-1', result)
}

DriverResults.prototype.selectRaceResult2 = function(driverIDInput, raceResult){
    const driverID = driverIDInput;
    const raceResults = raceResult;
    raceResults.forEach((result) => {
        const driver = result.Driver.driverId;
        if (driver === driverID) {
            this.publishRaceResult2(result)
        }
    })
}

DriverResults.prototype.publishRaceResult2 = function(result){
    PubSub.publish('Results:race-result-driver-2', result)
}

module.exports = DriverResults;