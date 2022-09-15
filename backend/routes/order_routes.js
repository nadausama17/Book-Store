const express = require('express');
const orderRouter = express.Router();
const orderController = require('../controllers/order_controller');
const { isAuth } = require("../middlewares/auth_middleware");

orderRouter.get('/',isAuth,orderController.getUserOrders);

module.exports = orderRouter;