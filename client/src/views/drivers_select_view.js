const PubSub = require('../helpers/pub_sub.js')

const DriversSelectView = function(selectElement){
    this.selectElement = selectElement;
}

DriversSelectView.prototype.bindEvents = function(){
    PubSub.subscribe('Drivers:drivers-ready', (event) => {
        const drivers = event.detail;
        this.populateDriverSelect(drivers);
    })
    
    this.selectElement.addEventListener('change', (event) => {
        driverID = event.target.value
        PubSub.publish('Drivers-select:driver-selected', driverID)
    })
        
}

DriversSelectView.prototype.populateDriverSelect = function(driversNames){
    driversNames.forEach((driver) => {
        const fullName = driver.givenName + " " + driver.familyName;
        const driverID = driver.driverId;
        const nameOption = document.createElement('option');
        nameOption.textContent = fullName;
        nameOption.value = driverID;
        this.selectElement.appendChild(nameOption)
    })
}



module.exports = DriversSelectView;
