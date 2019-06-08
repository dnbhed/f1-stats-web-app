const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');

const SeasonRaceSchedules = function(){
    this.races = [];
}

SeasonRaceSchedules.prototype.getData = function(){
    PubSub.subscribe('Seasons:season-selected', (event) => {
        const selectedYear = event.detail
        const request = new RequestHelper(`https://ergast.com/api/f1/${selectedYear}.json`);
        request.get().then((data) => {
            this.races = data.MRData.RaceTable.Races;
            PubSub.publish('RaceSchedules:season-races-ready', this.races);
        })
    })
}

module.exports = SeasonRaceSchedules;