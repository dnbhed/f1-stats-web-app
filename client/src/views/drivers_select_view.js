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
        PubSub.publish('Drivers-select:driver-1-selected', driverID);
    })
}

DriversSelectView.prototype.populateDriverSelect = function(driversNames){
    this.selectElement.innerHTML = " "
    const defaultOption = document.createElement('option');
    defaultOption.textContent = "select driver";
    defaultOption.setAttribute('selected', '');
    defaultOption.setAttribute('disabled', '');
    this.selectElement.appendChild(defaultOption);
    driversNames.forEach((driver) => {
        const fullName = driver.givenName + " " + driver.familyName;
        const driverID = driver.driverId;
        const nameOption = document.createElement('option');
        nameOption.textContent = fullName;
        nameOption.value = driverID;
        this.selectElement.appendChild(nameOption);
    })
}



module.exports = DriversSelectView;

