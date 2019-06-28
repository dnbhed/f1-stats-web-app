const express = require('express');
const app = express();
const path = require('path');
const parser = require('body-parser');



const publicPath = path.join(__dirname, '../client/public');
app.use(express.static(publicPath));

app.use(parser.json());

app.listen(process.env.PORT || 5000)
