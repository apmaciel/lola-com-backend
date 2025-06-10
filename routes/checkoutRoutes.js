const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');
const validationController = require('../controllers/validationController'); // New import
// In your routes file

router.post('/new', checkoutController.newCustomer);
router.post('/existing', checkoutController.existingCustomer);
router.post('/validate-cpf', validationController.validateCPF); // New route


module.exports = router;