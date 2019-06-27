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
        const driverID = event.target.value
        const select = event.target.id
        PubSub.publish(`Drivers-select:driver-${select}-selected`, driverID);
    })
}

DriversSelectView.prototype.populateDriverSelect = function(driversNames){
    this.selectElement.innerHTML = " "
    const defaultOption = document.createElement('option');
    defaultOption.textContent = "Select Driver";
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

