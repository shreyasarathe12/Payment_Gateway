// src/routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const {
    createPayment,
    getPaymentById,
    updatePayment,
    deletePayment
} = require('../controllers/paymentController');

// POST request to create a new payment
router.post('/payments', createPayment);

// GET request to retrieve a payment by ID
router.get('/payments/:id', getPaymentById);

// PUT request to update a payment by ID
router.put('/payments/:id', updatePayment);

// DELETE request to delete a payment by ID
router.delete('/payments/:id', deletePayment);

module.exports = router;
