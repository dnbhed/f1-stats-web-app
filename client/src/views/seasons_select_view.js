const PubSub = require('../helpers/pub_sub.js');

const SeasonsSelectView = function(selectElement){
    this.selectElement = selectElement;
}

SeasonsSelectView.prototype.bindEvents = function () {
    PubSub.subscribe('Seasons:seasons-ready', (event) => {
        this.populateSeasonSelect(event.detail)
    })
}

SeasonsSelectView.prototype.populateSeasonSelect = function(seasons){
    const relevantSeasons = seasons.forEach((season) => {
        console.log(season)
        if (season.season >= 2008){
            const seasonOption = document.createElement('option')
            seasonOption.textContent = season.season
            this.selectElement.appendChild(seasonOption)
        }
    })
}

module.exports = SeasonsSelectView;