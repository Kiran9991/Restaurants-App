const express = require('express');

const orderController = require('../controller/orderController');

const router = express.Router();

router.post('/add-order', orderController.addOrder);

router.get('/get-orders', orderController.getOrders);

router.delete('/delete-order/:id', orderController.deleteOrder);


module.exports = router;