const User = require('../models/user');
const Transaction = require('../models/transaction');

const seedData = async () => {
    try {
        // Clear existing data
        await User.deleteMany({});
        await Transaction.deleteMany({});

        // Seed users
        const users = [];
        for (let i = 1; i <= 10; i++) {
            const user = new User({
                name: `User ${i}`,
                phoneNumber: `123456789${i}`
            });
            users.push(user);
        }
        await User.insertMany(users);

        // Seed transactions
        const transactions = [];
        for (const user of users) {
            for (let j = 1; j <= 5; j++) {
                const transaction = new Transaction({
                    status: ['success', 'pending', 'failed'][Math.floor(Math.random() * 3)],
                    type: ['debit', 'credit'][Math.floor(Math.random() * 2)],
                    transactionDate: new Date(),
                    amount: Math.floor(Math.random() * 1000) + 1,
                    userId: user._id
                });
                transactions.push(transaction);
            }
        }
        await Transaction.insertMany(transactions);

        console.log('Database seeded successfully.');
    } catch (error) {
        console.error('Error seeding data:', error);
    }
};

module.exports = { seedData };
