const Drivers = require('./models/drivers.js');


document.addEventListener('DOMContentLoaded', () => {



    const drivers = new Drivers;
    drivers.getData();
})