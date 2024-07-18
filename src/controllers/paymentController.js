// src/controllers/paymentController.js
const Payment = require('../models/Payment');

// Function to create a new payment
const createPayment = async (req, res) => {
    try {
        const payment = new Payment(req.body);
        await payment.save();
        res.status(201).send(payment);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

// Function to get a payment by ID
const getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (!payment) {
            return res.status(404).send({ error: 'Payment not found' });
        }
        res.send(payment);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Function to update a payment by ID
const updatePayment = async (req, res) => {
    try {
        const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!payment) {
            return res.status(404).send({ error: 'Payment not found' });
        }
        res.send(payment);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

// Function to delete a payment by ID
const deletePayment = async (req, res) => {
    try {
        const payment = await Payment.findByIdAndDelete(req.params.id);
        if (!payment) {
            return res.status(404).send({ error: 'Payment not found' });
        }
        res.send({ message: 'Payment deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

module.exports = {
    createPayment,
    getPaymentById,
    updatePayment,
    deletePayment
};
