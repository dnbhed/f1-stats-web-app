const PubSub = require('../helpers/pub_sub.js');

const RaceSelectView = function(selectElement){
    this.selectElement = selectElement;
}

RaceSelectView.prototype.bindEvents = function(){
    PubSub.subscribe('RaceSchedules:season-races-ready', (event) => {
        this.publishRaces(event.detail);
    })
}

RaceSelectView.prototype.publishRaces = function(races){
    races.forEach((race) => {
        const round = race.round;
        const country = race.Circuit.Location.country;
        const option = document.createElement('option');
        console.log(option)
        option.textContent = `Round ${round}: ${country}`
        option.value = race.Circuit.circuitId
        this.selectElement.appendChild(option);
    })
}

module.exports = RaceSelectView;