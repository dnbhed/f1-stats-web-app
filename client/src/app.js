const Drivers = require('./models/drivers.js');
const DriversSelectView = require('./views/drivers_select_view.js');
const DriverDetailsView = require('./views/driver_details_view.js');

document.addEventListener('DOMContentLoaded', () => {

    const driverDetails = document.querySelector('#driver-details');
    const driverDetailsView = new DriverDetailsView(driverDetails);
    driverDetailsView.bindEvents();

    const driversSelector = document.querySelector('#drivers-list');
    const driversSelectView = new DriversSelectView(driversSelector);
    driversSelectView.bindEvents();

    const drivers = new Drivers;
    drivers.getData();
})