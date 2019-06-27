const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper');


const DriverResults = function(){
    this.racesResults = {driverCode: "", years: [], grids: [], positions:[]}
}

DriverResults.prototype.getData = function(){
    PubSub.subscribe('RacesSchedules:race-selected', (event) => {
        const circuitID = event.detail;
        PubSub.subscribe("Drivers-select:driver-drivers-list-1-selected", (event) => {
            const driverID = event.detail;
            const request = new RequestHelper(`http://ergast.com/api/f1/drivers/${driverID}/circuits/${circuitID}/results.json`);
            request.get().then((data) => {
                const races = data.MRData.RaceTable.Races;
                const driverResults = this.parseDriversResults(races);
                PubSub.publish('DriverResults:results-1-ready', driverResults)
            })
        })
    })

    PubSub.subscribe('RacesSchedules:race-selected', (event) => {
        const circuitID = event.detail;
        PubSub.subscribe("Drivers-select:driver-drivers-list-2-selected", (event) => {
            const driverID = event.detail;
            const request = new RequestHelper(`http://ergast.com/api/f1/drivers/${driverID}/circuits/${circuitID}/results.json`);
            request.get().then((data) => {
                const driverResults = this.parseDriversResults(data.MRData.RaceTable.Races);
                PubSub.publish('DriverResults:results-2-ready', driverResults)
            })
        })
    })
}

DriverResults.prototype.parseDriversResults = function(results){
    const firstRace = results[0]
    const driverCode = firstRace.Results[0].Driver.code;
    this.racesResults.driverCode = driverCode;
    results.forEach((race) => {
        const season = parseInt(race.season);
        this.racesResults.years.push(season);

        const grid = parseInt(race.Results[0].grid);
        this.racesResults.grids.push(grid);

        const position = parseInt(race.Results[0].position);
        this.racesResults.positions.push(position);   
    })
    return this.racesResults;
}
    




module.exports = DriverResults;