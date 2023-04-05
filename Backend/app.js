const express = require('express');

var cors = require('cors');

const bodyParser = require('body-parser');

const sequelize = require('./util/database');

const app = express();

const orders = require('./models/orders');

app.use(bodyParser.json({ extended: false }));

app.use(cors());

const orderRoutes = require('./routes/orderRoute');

app.use('/order',orderRoutes);

sequelize.sync().then(result => {
    // console.log(result);
}).catch(err => {
    console.log(err);
})

app.listen(5000);