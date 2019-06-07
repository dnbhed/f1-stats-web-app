const PubSub = require('../helpers/pub_sub.js');

const DriverDetailsView = function(container){
    this.container = container;
}

DriverDetailsView.prototype.bindEvents = function(){
    PubSub.subscribe('Drivers:selected-driver-details', (event) => {
        this.container.innerHTML = ""
        this.populateDetails(event.detail[0]);
    })
}

DriverDetailsView.prototype.populateDetails = function(driver){
    this.showDriverName(driver);
    this.showDriverAge(driver);
}

DriverDetailsView.prototype.showDriverName = function(driver){
    const driverName = driver.permanentNumber + ' ' + driver.givenName + " " + driver.familyName;
    const nameContainer = document.createElement('h2');
    nameContainer.textContent = driverName;
    this.container.appendChild(nameContainer);
}

DriverDetailsView.prototype.showDriverAge = function(driver){
    const driverAge = this.calculateAge(driver);
    const ageContainer = document.createElement('h3');
    ageContainer.textContent = `Age: ${driverAge}`;
    this.container.appendChild(ageContainer);
}








DriverDetailsView.prototype.calculateAge = function(driver){
    const now = new Date();
    const birthdate = new Date(driver.dateOfBirth);
    const diff = now - birthdate;
    const age = Math.floor(diff / 31557600000);
    return age
}

module.exports = DriverDetailsView;