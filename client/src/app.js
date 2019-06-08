const Drivers = require('./models/drivers.js');
const Seasons = require('./models/seasons.js');
const SeasonRaceSchedules = require('./models/season_race_schedules');
const RaceResults = require('./models/race_results.js')
const QualifyingResults = require('./models/qualifying_results.js');
const DriversSelectView = require('./views/drivers_select_view.js');
const DriverDetailsView = require('./views/driver_details_view.js');
const SeasonsSelectView = require('./views/seasons_select_view.js');
const RaceSelectView = require('./views/race_select_view.js');
const ChartView = require('./views/chart_view.js')

document.addEventListener('DOMContentLoaded', () => {

    const chartContainer = document.querySelector('#chart-container');
    const chartView = new ChartView(chartContainer);
    chartView.renderChart();

    const driverDetails = document.querySelector('#driver-info');
    const driverDetailsView = new DriverDetailsView(driverDetails);
    driverDetailsView.bindEvents();

    const qualifyingResults = new QualifyingResults;
    qualifyingResults.getData();

    const raceResults = new RaceResults;
    raceResults.getData();

    const raceSelector = document.querySelector('#races-list');
    const raceSelectView = new RaceSelectView(raceSelector);
    raceSelectView.bindEvents();

    const seasonRaceSchedules = new SeasonRaceSchedules;
    seasonRaceSchedules.getData();

    const driversSelector = document.querySelector('#drivers-list-1');
    const driversSelectView = new DriversSelectView(driversSelector);
    driversSelectView.bindEvents();

    const drivers = new Drivers;
    drivers.getData();

    const seasonsSelector = document.querySelector('#seasons-list');
    const seasonsSelectView = new SeasonsSelectView(seasonsSelector);
    seasonsSelectView.bindEvents();


    const seasons = new Seasons;
    seasons.getData();

    
})