const mongoose = require('mongoose');
const User = require('./models/User'); // Correct relative path to User model

mongoose.connect('mongodb://mongo:27017/payment_gateway')
  .then(async () => {
    console.log('Connected to MongoDB');

    // Fetch the user by username
    const username = 'johndoe'; // Replace with your actual username
    const user = await User.findOne({ username });

    if (user) {
      console.log('User ID:', user._id.toString());
    } else {
      console.log('User not found');
    }
    
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Connection error', err);
  });
