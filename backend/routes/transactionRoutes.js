const express = require('express');
const Transaction = require('../models/TransactionSchema');

const router = express.Router();

// API 2
router.get('/users/:id', async(req,res)=>{
    try {
     const { status, type, from, to } = req.query;
     const filters = { userId: req.params.id };

     if (status) filters.status = status;
     if (type) filters.type = type;
     if (from || to) {
         filters.transactionDate = {};
         if (from) filters.transactionDate.$gte = new Date(from);
         if (to) filters.transactionDate.$lte = new Date(to);
     }

     const transactions = await Transaction.find(filters);
     res.json(transactions);
 } catch (err) {
     res.status(500).json({ message: err.message });
 }
});


// API 3
router.get('/', async (req,res)=>{
    try {
        const { status, type, from, to, page = 1, limit = 10 } = req.query;
        const filters = {};

        if (status) filters.status = status;
        if (type) filters.type = type;
        if (from || to) {
            filters.transactionDate = {};
            if (from) filters.transactionDate.$gte = new Date(from);
            if (to) filters.transactionDate.$lte = new Date(to);
        }

        const transactions = await Transaction.aggregate([
            { $match: filters },
            { $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'userDetails'
            }},
            { $unwind: '$userDetails' },
            { $skip: (page - 1) * limit },
            { $limit: parseInt(limit) }
        ]);

        res.json(transactions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
