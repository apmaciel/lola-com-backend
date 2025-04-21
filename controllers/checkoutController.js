const Customer = require('../models/customerModel');

const checkoutController = {
    async newCustomer(req, res) {
        try {
            const { name, email, phone, cpf, address } = req.body;
            
            // Basic validation
            if (!name || !email || !phone || !cpf || !address) {
                return res.status(400).json({ error: 'All fields are required' });
            }

            // Create new customer
            const result = await Customer.create({ name, email, phone, cpf, address });
            
            res.status(201).json({ 
                message: 'Customer created successfully',
                customerId: result.id 
            });
        } catch (error) {
            if (error.code === 'DUPLICATE_ENTRY') {
                return res.status(409).json({ 
                    error: `Customer with this ${error.field} already exists`,
                    customer: error.customer
                });
            }
            
            console.error('Error creating customer:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async existingCustomer(req, res) {
        try {
            const { email } = req.body;
            
            if (!email) {
                return res.status(400).json({ error: 'Email is required' });
            }

            const customer = await Customer.findByEmail(email);
            
            if (!customer) {
                return res.status(404).json({ error: 'Customer not found' });
            }

            res.status(200).json(customer);
        } catch (error) {
            console.error('Error finding customer:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = checkoutController;