const Drivers = require('./models/drivers.js');
const Seasons = require('./models/seasons.js');
const SeasonRaceSchedules = require('./models/season_race_schedules');
const RaceResults = require('./models/race_results.js')
const DriversSelectView = require('./views/drivers_select_view.js');
const DriverDetailsView = require('./views/driver_details_view.js');
const SeasonsSelectView = require('./views/seasons_select_view.js');
const RaceSelectView = require('./views/race_select_view.js');

document.addEventListener('DOMContentLoaded', () => {

    const driverDetails = document.querySelector('#info-container');
    const driverDetailsView = new DriverDetailsView(driverDetails);
    driverDetailsView.bindEvents();

    const raceResults = new RaceResults;
    raceResults.getData();

    const raceSelector = document.querySelector('#races-list');
    const raceSelectView = new RaceSelectView(raceSelector);
    raceSelectView.bindEvents();

    const seasonRaceSchedules = new SeasonRaceSchedules;
    seasonRaceSchedules.getData();

    const seasonsSelector = document.querySelector('#seasons-list');
    const seasonsSelectView = new SeasonsSelectView(seasonsSelector);
    seasonsSelectView.bindEvents();

    const driversSelector = document.querySelector('#drivers-list-1');
    const driversSelectView = new DriversSelectView(driversSelector);
    driversSelectView.bindEvents();    

    const seasons = new Seasons;
    seasons.getData();

    const drivers = new Drivers;
    drivers.getData();
})