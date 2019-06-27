const Drivers = require('./models/drivers.js');
const Seasons = require('./models/seasons.js');
const SeasonRaceSchedules = require('./models/season_race_schedules');
const DriverResults = require('./models/driver_results.js');
const DriversSelectView = require('./views/drivers_select_view.js');
const DriverDetailsView = require('./views/driver_details_view.js');
const SeasonsSelectView = require('./views/seasons_select_view.js');
const RaceSelectView = require('./views/race_select_view.js');
const RaceChartView = require('./views/race_chart_view.js')

document.addEventListener('DOMContentLoaded', () => {

    const chartContainer = document.querySelector('#chart-container');
    const chartView = new RaceChartView(chartContainer);
    chartView.bindEvents();

    const driverResults = new DriverResults;
    driverResults.getData();

    const driverDetails1 = document.querySelector('#driver-1-info');
    const driverDetailsView1 = new DriverDetailsView(driverDetails1);
    driverDetailsView1.bindEvents1();

    const driverDetails2 = document.querySelector('#driver-2-info');
    const driverDetailsView2 = new DriverDetailsView(driverDetails2);
    driverDetailsView2.bindEvents2();


    const raceSelector = document.querySelector('#races-list');
    const raceSelectView = new RaceSelectView(raceSelector);
    raceSelectView.bindEvents();

    const seasonRaceSchedules = new SeasonRaceSchedules;
    seasonRaceSchedules.getData();

    const driversSelector1 = document.querySelector('#drivers-list-1');
    const driversSelectView1 = new DriversSelectView(driversSelector1);
    driversSelectView1.bindEvents();

    const driversSelector2 = document.querySelector('#drivers-list-2');
    const driversSelectView2 = new DriversSelectView(driversSelector2);
    driversSelectView2.bindEvents();

    const drivers = new Drivers;
    drivers.getData();

    const seasonsSelector = document.querySelector('#seasons-list');
    const seasonsSelectView = new SeasonsSelectView(seasonsSelector);
    seasonsSelectView.bindEvents();

    const seasons = new Seasons;
    seasons.getData();

    
})