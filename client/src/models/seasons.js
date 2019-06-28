const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');

const Seasons = function(){
    this.seasons = [];
}

Seasons.prototype.getData = function(){
    const request = new RequestHelper("https://ergast.com/api/f1/seasons.json?limit=100");
    request.get().then((data) => {
        this.seasons = data.MRData.SeasonTable.Seasons
        PubSub.publish('Seasons:seasons-ready', this.seasons)
    })
}


module.exports = Seasons;