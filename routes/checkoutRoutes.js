const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');

router.post('/new', checkoutController.newCustomer);
router.post('/existing', checkoutController.existingCustomer);

module.exports = router;