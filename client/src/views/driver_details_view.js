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
}

DriverDetailsView.prototype.showDriverName = function(driver){
    const driverName = driver.givenName + " " + driver.familyName;
    const nameContainer = document.createElement('h2');
    nameContainer.textContent = driverName;
    this.container.appendChild(nameContainer);
}

module.exports = DriverDetailsView;