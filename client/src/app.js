const Drivers = require('./models/drivers.js');
const DriversSelectView = require('./views/drivers_select_view.js');

document.addEventListener('DOMContentLoaded', () => {

    const driversSelector = document.querySelector('#drivers-list');
    const driversSelectView = new DriversSelectView(driversSelector);
    driversSelectView.bindEvents();

    const drivers = new Drivers;
    drivers.getData();
})