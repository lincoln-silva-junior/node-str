'use strict';

const express = require('express');
const router = express.Router();
const controller = require("../controllers/order-controller");
const AuthService = require("../services/auth-service");

router.get('/',  AuthService.authorize, controller.get);
router.post('/', AuthService.authorize, controller.post);

module.exports = router;