const RequestHelper = require('../helpers/request_helper');
const PubSub = require('../helpers/pub_sub.js');

const QualifyingResults = function () {
    this.qualifyingResults = []
}

QualifyingResults.prototype.getData = function () {
    PubSub.subscribe('Seasons:season-selected', (season) => {
        this.year = season.detail
    })
    PubSub.subscribe('RacesSchedules:race-selected', (roundNumber) => {
        const round = roundNumber.detail
        const request = new RequestHelper(`https://ergast.com/api/f1/${this.year}/${round}/qualifying.json`);
        request.get().then((data) => {
            console.log(data.MRData.RaceTable.Races)
            if (data.MRData.RaceTable.Races[0]){
            this.qualifyingResults = data.MRData.RaceTable.Races[0].QualifyingResults
            PubSub.publish('Qualifyingresults:qualifying-results-ready', this.qualifyingResults)
            }
        })
    })
}


module.exports = QualifyingResults;