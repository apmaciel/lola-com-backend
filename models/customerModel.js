const pool = require('../config/db');

const Customer = {
    async create(customerData) {
        try {
            const [result] = await pool.query(
                'INSERT INTO customers (name, email, phone, cpf, address) VALUES (?, ?, ?, ?, ?)',
                [customerData.name, customerData.email, customerData.phone, customerData.cpf, customerData.address]
            );
            return { id: result.insertId };
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                // Extract which field caused the duplicate entry
                const field = error.message.includes('email') ? 'email' : 
                            error.message.includes('phone') ? 'phone' : 'cpf';
                
                // Find the existing customer by the duplicate field
                const [rows] = await pool.query(
                    `SELECT * FROM customers WHERE ${field} = ? LIMIT 1`,
                    [customerData[field]]
                );
                
                if (rows.length > 0) {
                    throw {
                        code: 'DUPLICATE_ENTRY',
                        status: 409,
                        customer: rows[0],
                        field
                    };
                }
            }
            throw error; // Re-throw other errors
        }
    },

    async findByEmail(email) {
        const [rows] = await pool.query(
            'SELECT * FROM customers WHERE email = ? LIMIT 1',
            [email]
        );
        return rows[0] || null;
    }
};

module.exports = Customer;