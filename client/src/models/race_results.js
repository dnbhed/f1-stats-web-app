const RequestHelper = require('../helpers/request_helper');
const PubSub = require('../helpers/pub_sub.js');

const RaceResults = function(){
    this.raceResults = []
}

RaceResults.prototype.getData = function(){
    PubSub.subscribe('Seasons:season-selected', (season) => {
        this.year = season.detail
    })
    PubSub.subscribe('RacesSchedules:race-selected', (roundNumber) => {
        const round = roundNumber.detail
        const request = new RequestHelper(`https://ergast.com/api/f1/${this.year}/${round}/results.json`);
        request.get().then((data) => {
            this.raceResults = data.MRData.RaceTable.Races[0].Results
            PubSub.publish('Raceresults:race-results-ready', this.raceResults)
        })
    })
}


module.exports = RaceResults;