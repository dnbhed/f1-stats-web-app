const RequestHelper = require('../helpers/request_helper');
const PubSub = require('../helpers/pub_sub.js');

const Drivers = function(){
    this.driversData = [];
    // this.driversNames = [];
}

Drivers.prototype.getData = function(){
    const request = new RequestHelper("http://ergast.com/api/f1/2019/drivers.json");
    request.get().then((data) => {
        this.driversData = data.MRData.DriverTable.Drivers
        PubSub.publish('Drivers:drivers-ready', this.driversData)
    })

    PubSub.subscribe('Drivers-select:driver-selected', (event) => {
        const selectedDriver = event.detail;
        const driverDetails = this.driversData.filter((driver) => {
                if (driver.driverId === selectedDriver){
                    return driver
                }
        })
        PubSub.publish('Drivers:selected-driver-details', driverDetails)
    })
}

module.exports = Drivers;