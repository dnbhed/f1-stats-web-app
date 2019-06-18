const PubSub = require('../helpers/pub_sub.js');

const RaceSelectView = function(selectElement){
    this.selectElement = selectElement;
}

RaceSelectView.prototype.bindEvents = function(){
    PubSub.subscribe('RaceSchedules:season-races-ready', (event) => {
        this.publishRaces(event.detail);
    });

    this.selectElement.addEventListener('change', (event) => {
        const selectedRace = event.target.value;
        console.log("selected race:", selectedRace);
        PubSub.publish('RacesSchedules:race-selected', selectedRace);
    });
}

RaceSelectView.prototype.publishRaces = function(races){
    this.selectElement.innerHTML = ''
    races.forEach((race) => {
        const round = race.round;
        const name = race.raceName;
        const option = document.createElement('option');
        option.textContent = `Round ${round}: ${name}`
        option.value = race.round
        this.selectElement.appendChild(option);
    })
}

module.exports = RaceSelectView;