const express = require('express');
const mongoose = require('mongoose');
const authMiddleware = require('./src/middleware/authMiddleware');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // Ensure this path is correct

const paymentRoutes = require('./src/routes/paymentRoutes');
const userRoutes = require('./src/routes/userRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

// Basic Authentication Middleware
app.use(authMiddleware);

// Use routes
app.use('/api', paymentRoutes);
app.use('/api', userRoutes);

// Error handling
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: err.message });
});

mongoose.connect('mongodb://mongo:27017/payment-gateway', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async () => {
    console.log('Connected to MongoDB');

    const User = require('./src/models/User');

    let user = await User.findOne({ username: 'johndoe' });

    if (!user) {
        console.log('User not found. Creating new user...');
        user = new User({
            username: 'johndoe',
            password: 'password123'
        });
        await user.save();
        console.log('User created:', user);
    } else {
        console.log('User found:', user);
    }

    console.log('User ID:', user._id.toString());

}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
