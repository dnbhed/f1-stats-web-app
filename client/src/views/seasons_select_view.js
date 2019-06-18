const PubSub = require('../helpers/pub_sub.js');

const SeasonsSelectView = function(selectElement){
    this.selectElement = selectElement;
}

SeasonsSelectView.prototype.bindEvents = function () {
    PubSub.subscribe('Seasons:seasons-ready', (event) => {
        this.populateSeasonSelect(event.detail);
    });

    this.selectElement.addEventListener('change', (event) => {
        PubSub.publish('Seasons:season-selected', event.target.value);
    });
}

SeasonsSelectView.prototype.populateSeasonSelect = function(seasons){
    this.selectElement.innerHTML = ''
    seasons.forEach((season) => {
        if(season.season > 2002){
        const seasonOption = document.createElement('option');
        seasonOption.textContent = season.season;
        this.selectElement.appendChild(seasonOption);
        }
    });
}

module.exports = SeasonsSelectView;