const express = require('express');
const User = require('../models/UserSchema');
const router = express.Router();

router.get('/:id', async(req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
