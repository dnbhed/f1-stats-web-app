const PubSub = require('../helpers/pub_sub.js');

const DriverDetailsView = function(container){
    this.container = container;
}

DriverDetailsView.prototype.bindEvents1 = function(){
    PubSub.subscribe('Drivers:selected-driver-1-details', (event) => {
        this.container.innerHTML = ""
        this.populateDetails(event.detail[0]);
    })
}

DriverDetailsView.prototype.bindEvents2 = function(){
    PubSub.subscribe('Drivers:selected-driver-2-details', (event) => {
        this.container.innerHTML = ""
        this.populateDetails(event.detail[0]);
    })
}

DriverDetailsView.prototype.populateDetails = function(driver){
    this.showDesignations(driver);
    this.showDriverName(driver);
    this.showNationality(driver);
}

DriverDetailsView.prototype.showDesignations = function(driver){
    let driverCode;
    if (driver.code){
        driverCode = driver.code
    } else {
        driverCode = ''
    }
    let driverNumber;
    if (driver.permanentNumber){
        driverNumber = ` : ${driver.permanentNumber}`
    } else {
        driverNumber = ''
    }
    const designationContainer = document.createElement('h1');
    designationContainer.textContent = driverCode + driverNumber;
    this.container.appendChild(designationContainer);
}

DriverDetailsView.prototype.showDriverName = function(driver){
    const driverName = driver.givenName + " " + driver.familyName;
    const nameContainer = document.createElement('h2');
    nameContainer.textContent = driverName;
    this.container.appendChild(nameContainer);
}

DriverDetailsView.prototype.showNationality = function(driver){
    const driverNationality = driver.nationality;
    const natContainer = document.createElement('h3');
    natContainer.textContent = driverNationality;
    this.container.appendChild(natContainer);
}

module.exports = DriverDetailsView;