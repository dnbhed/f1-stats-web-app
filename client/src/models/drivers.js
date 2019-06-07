const RequestHelper = require('../helpers/request_helper');
const PubSub = require('../helpers/pub_sub.js');

const Drivers = function(){
    this.driversData = [];
    this.driversNames = [];
}

Drivers.prototype.getData = function(){
    const request = new RequestHelper("http://ergast.com/api/f1/2019/drivers.json");
    request.get().then((data) => {
        this.driversData = data.MRData.DriverTable.Drivers
        PubSub.publish('Drivers:drivers-ready', this.driversData)
        this.publishDriversNames(this.driversData);
    })
}

Drivers.prototype.publishDriversNames = function(drivers){
    drivers.forEach((driver) => {
        fullName = driver.givenName + " " + driver.familyName;
        this.driversNames.push(fullName)
    })
    PubSub.publish('Drivers:drivers-names-ready', this.driversNames)
}

module.exports = Drivers;