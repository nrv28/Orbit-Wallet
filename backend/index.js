const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

// Initialize app
const app = express();
const PORT = process.env.PORT || 3000;

// Load environment variables
dotenv.config();
connectDB();

// Middleware
app.use(bodyParser.json());

// For API 1
app.use('/users', userRoutes);

// For API 2 & 3
app.use('/transactions', transactionRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




// // Uncomment to seed data initially
// seedData();

// app.get('/',(req,res)=>{
//    res.send("Yes");
// });

// // API 1: Get user details by Id
// app.get('/users/:id', async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id);
//         if (!user) return res.status(404).json({ message: 'User not found' });
//         res.json(user);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });


// // MongoDB connection
// mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.vxboh.mongodb.net/Orbitwallet`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => console.log('MongoDB connected'))
//   .catch(err => console.log(err));

// User Schema and Model
// const userSchema = new mongoose.Schema({
//     name: String,
//     phoneNumber: String
// });
// const User = mongoose.model('User', userSchema);

// // Transaction Schema and Model
// const transactionSchema = new mongoose.Schema({
//     status: { type: String, enum: ['success', 'pending', 'failed'] },
//     type: { type: String, enum: ['debit', 'credit'] },
//     transactionDate: Date,
//     amount: Number,
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
// });
// const Transaction = mongoose.model('Transaction', transactionSchema);

// // Seed data
// const seedData = async () => {
//     await User.deleteMany({});
//     await Transaction.deleteMany({});

//     const users = [];
//     for (let i = 1; i <= 10; i++) {
//         const user = new User({
//             name: `User ${i}`,
//             phoneNumber: `123456789${i}`
//         });
//         users.push(user);
//     }
//     await User.insertMany(users);

//     const transactions = [];
//     for (const user of users) {
//         for (let j = 1; j <= 5; j++) {
//             const transaction = new Transaction({
//                 status: ['success', 'pending', 'failed'][Math.floor(Math.random() * 3)],
//                 type: ['debit', 'credit'][Math.floor(Math.random() * 2)],
//                 transactionDate: new Date(),
//                 amount: Math.floor(Math.random() * 1000) + 1,
//                 userId: user._id
//             });
//             transactions.push(transaction);
//         }
//     }
//     await Transaction.insertMany(transactions);
// };


// // API 2: Get all transactions for a user by user Id with filters
// app.get('/users/:id/transactions', async (req, res) => {
//     try {
//         const { status, type, from, to } = req.query;
//         const filters = { userId: req.params.id };

//         if (status) filters.status = status;
//         if (type) filters.type = type;
//         if (from || to) {
//             filters.transactionDate = {};
//             if (from) filters.transactionDate.$gte = new Date(from);
//             if (to) filters.transactionDate.$lte = new Date(to);
//         }

//         const transactions = await Transaction.find(filters);
//         res.json(transactions);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // API 3: Get all transactions with user details by filters
// app.get('/transactions', async (req, res) => {
//     try {
//         const { status, type, from, to, page = 1, limit = 10 } = req.query;
//         const filters = {};

//         if (status) filters.status = status;
//         if (type) filters.type = type;
//         if (from || to) {
//             filters.transactionDate = {};
//             if (from) filters.transactionDate.$gte = new Date(from);
//             if (to) filters.transactionDate.$lte = new Date(to);
//         }

//         const transactions = await Transaction.aggregate([
//             { $match: filters },
//             { $lookup: {
//                 from: 'users',
//                 localField: 'userId',
//                 foreignField: '_id',
//                 as: 'userDetails'
//             }},
//             { $unwind: '$userDetails' },
//             { $skip: (page - 1) * limit },
//             { $limit: parseInt(limit) }
//         ]);

//         res.json(transactions);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });