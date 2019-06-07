const Drivers = require('./models/drivers.js');
const Seasons = require('./models/seasons.js');
const DriversSelectView = require('./views/drivers_select_view.js');
const DriverDetailsView = require('./views/driver_details_view.js');
const SeasonsSelectView = require('./views/seasons_select_view.js');

document.addEventListener('DOMContentLoaded', () => {

    

    const driverDetails = document.querySelector('#info-container');
    const driverDetailsView = new DriverDetailsView(driverDetails);
    driverDetailsView.bindEvents();

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