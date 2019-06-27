const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper');


const DriverResults = function(){
    this.driver1Results = {driverCode: "", years: [], grids: [], positions:[]};
    this.driver2Results = {driverCode: "", years: [], grids: [], positions:[]};
}

DriverResults.prototype.getData = function(){
    PubSub.subscribe('RacesSchedules:race-selected', (event) => {
        const circuitID = event.detail;
        PubSub.subscribe("Drivers-select:driver-drivers-list-1-selected", (event) => {
            const driverID = event.detail;
            const request = new RequestHelper(`http://ergast.com/api/f1/drivers/${driverID}/circuits/${circuitID}/results.json`);
            request.get().then((data) => {
                const races = data.MRData.RaceTable.Races;
                const driverResults = this.parseDriver1Results(races);
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
                debugger
                const driverResults = this.parseDriver2Results(data.MRData.RaceTable.Races);
                PubSub.publish('DriverResults:results-2-ready', driverResults)
            })
        })
    })
}

DriverResults.prototype.parseDriver1Results = function(results){
    const firstRace = results[0]
    const driverCode = firstRace.Results[0].Driver.code;
    this.driver1Results.driverCode = driverCode;
    this.driver1Results[driverCode] = []
    results.forEach((race) => {
        const season = parseInt(race.season);
        this.driver1Results.years.push(season);

        const grid = parseInt(race.Results[0].grid);
        this.driver1Results.grids.push(grid);

        const position = parseInt(race.Results[0].position);
        this.driver1Results.positions.push(position);   
    })
    return this.driver1Results;
}

DriverResults.prototype.parseDriver2Results = function(results){
    const firstRace = results[0]
    const driverCode = firstRace.Results[0].Driver.code;
    this.driver2Results.driverCode = driverCode;
    this.driver2Results[driverCode] = []
    results.forEach((race) => {
        const season = parseInt(race.season);
        this.driver2Results.years.push(season);

        const grid = parseInt(race.Results[0].grid);
        this.driver2Results.grids.push(grid);

        const position = parseInt(race.Results[0].position);
        this.driver2Results.positions.push(position);   
    })
    return this.driver2Results;
}
    




module.exports = DriverResults;