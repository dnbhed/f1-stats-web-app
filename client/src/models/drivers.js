const RequestHelper = require('../helpers/request_helper');
const PubSub = require('../helpers/pub_sub.js');

const Drivers = function(){
    this.driversData = [];
}

Drivers.prototype.getData = function(){

    const request = new RequestHelper('https://ergast.com/api/f1/drivers.json?limit=1000');
    request.get().then((data) => {
        this.driversData = data.MRData.DriverTable.Drivers;
        PubSub.publish('Drivers:drivers-ready', this.driversData)
    })
    
    PubSub.subscribe('Seasons:season-selected', (event) => {
        const year = event.detail
        const request = new RequestHelper(`http://ergast.com/api/f1/${year}/drivers.json`);
        request.get().then((data) => {
            this.driversData = data.MRData.DriverTable.Drivers
            PubSub.publish('Drivers:drivers-ready', this.driversData)
        })
    })
    

    PubSub.subscribe('Drivers-select:driver-drivers-list-1-selected', (event) => {
        const selectedDriver = event.detail;
        const driverDetails = this.driversData.filter((driver) => {
                if (driver.driverId === selectedDriver){
                    return driver
                }
        })
        PubSub.publish('Drivers:selected-driver-1-details', driverDetails)
    })

    PubSub.subscribe('Drivers-select:driver-drivers-list-2-selected', (event) => {
        const selectedDriver = event.detail;
        const driverDetails = this.driversData.filter((driver) => {
                if (driver.driverId === selectedDriver){
                    return driver
                }
        })
        PubSub.publish('Drivers:selected-driver-2-details', driverDetails)
    })
}

module.exports = Drivers;