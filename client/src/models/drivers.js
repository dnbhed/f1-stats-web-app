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
}

module.exports = Drivers;