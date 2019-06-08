const PubSub = require('../helpers/pub_sub.js');

const DriverResults = function(){
    this.raceResult = []
    this.qualyResult = []
}

DriverResults.prototype.bindEvents = function(){
    PubSub.subscribe('Drivers:selected-driver-1-details', (event) => {
        this.parseDriver1Details(event.detail[0])
    })
    PubSub.subscribe('Drivers:selected-driver-2-details', (event) => {
        this.parseDriver2Details(event.detail[0])
    })
}

DriverResults.prototype.parseDriver1Details = function (driver) {
    const driverName = driver.givenName + " " + driver.familyName;
    const driverID = driver.diverId;
    this.driver1Details.driverName = driverName;
    this.driver1Details.driverId = driverID;
    console.log(this.driver1Details)
}

DriverResults.prototype.parseDriver2Details = function (driver) {
    const driverName = driver.givenName + " " + driver.familyName;
    const driverID = driver.diverId;
    this.driver2Details.driverName = driverName;
    this.driver2Details.driverId = driverID;
}

module.exports = DriverResults;