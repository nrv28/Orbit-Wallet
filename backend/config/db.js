const mongoose = require('mongoose');


const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.vxboh.mongodb.net/Orbitwallet`);
        console.log('MongoDB connected');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;