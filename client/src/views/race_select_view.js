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
    const defaultOption = document.createElement('option');
    defaultOption.textContent = "Select Track";
    defaultOption.setAttribute('selected', '');
    defaultOption.setAttribute('disabled', '');
    this.selectElement.appendChild(defaultOption);
    races.forEach((race) => {
        const name = race.Circuit.circuitName;
        const option = document.createElement('option');
        option.textContent = `${name}`
        option.value = race.Circuit.circuitId
        this.selectElement.appendChild(option);
    })
}

module.exports = RaceSelectView;