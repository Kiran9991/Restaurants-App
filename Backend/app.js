const express = require('express');

var cors = require('cors');

const bodyParser = require('body-parser');

const sequelize = require('./util/database');

const app = express();

const orders = require('./models/orders');

app.use(bodyParser.json({ extended: false }));

app.use(cors());

app.post('/order/add-order', async (req, res) => {
    try {
        const price = req.body.price;
        const dish = req.body.dish;
        const table = req.body.table;

        const data = await orders.create({price: price, dish: dish, table: table});
        res.status(201).json({newOrderDetail: data});
    } catch(err) {
        console.log('The orders data is not posting');
        res.status(500).json({
            error:err
        })
    }
})

app.get('/order/get-orders', async (req, res) => {
    try {
        const order = await orders.findAll()
        res.status(200).json({allOrderDetails: order})
    } catch(error) {
        console.log('Get expenses is failing', JSON.stringify(error))
        res.status(500).json({error: error})
    }
})

app.delete('/order/delete-order/:id', async (req, res) => {
    try {
        if(!req.params.id === 'undefined') {
            console.log("ID is missing")
            return res.status(400).json({err: 'ID is missing'})
        }
        const orderId = req.params.id;
        await orders.destroy({where: {id: orderId}});
        res.sendStatus(200);
    } catch(err) {
        console.log(err)
        res.status(500).json(err);
    }
})

sequelize.sync().then(result => {
    // console.log(result);
}).catch(err => {
    console.log(err);
})

app.listen(5000);