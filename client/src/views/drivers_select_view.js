const PubSub = require('../helpers/pub_sub.js')

const DriversSelectView = function(selectElement){
    this.selectElement = selectElement;
}

DriversSelectView.prototype.bindEvents = function(){
    PubSub.subscribe('Drivers:drivers-names-ready', (event) => {
        driversNames = event.detail;
        this.populateDriverSelect(driversNames);
    })
}

DriversSelectView.prototype.populateDriverSelect = function(driversNames){
    driversNames.forEach((name) => {
        const nameOption = document.createElement('option');
        nameOption.textContent = name;
        this.selectElement.appendChild(nameOption)
    })
}


module.exports = DriversSelectView;

