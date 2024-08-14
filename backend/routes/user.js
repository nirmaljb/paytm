const express = require("express");
const router = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const { User, Account } = require("../db");
const JWT_SECRET = require("../config");

const authMiddleware = require("../middlewares/authMiddleware");
const signinMiddleware = require("../middlewares/signinMiddleware");
const updateMiddleware = require("../middlewares/updateMiddleware");

router.post('/signup', authMiddleware, async (req, res) => {
    const { username, email, password } = req.body;

    const hash = await bcrypt.hash(password, 10);
    
    try {
        const new_user = User({email, password: hash, username})
        const response = await new_user.save()
        const jwt_token = jwt.sign({userId: response._id, username: username}, JWT_SECRET)

        //creating the user a bank account and initializing it with a random balance from 1-1000
        const randomInt = Math.floor(Math.random() * 9100) + 1000;
        const new_account = Account({userId: response._id, balance: randomInt})

        const acc_response = await new_account.save()
        console.log(acc_response)
        
        return res.json({msg: 'user created', token: `Bearer ${jwt_token}`})

    }catch(error) {
        const error_reason = error.keyValue
        return res.json({msg: error_reason, err: error})
    }

})

router.post('/signin', signinMiddleware, async (req, res) => {
     const { email, password } = req.body;
     const response = await User.findOne({email: email})

     if(!response) return res.json({msg: 'no user found'})
    
     const isMatch = await bcrypt.compare(password, response.password)
     
     if(!isMatch) {
         return res.json({msg: "password doesn't match"})
     }

     res.json({msg: 'logged in', log: response})
})

router.put('/', updateMiddleware, async (req, res) => {
    console.log(req.userId)
    try {
        const response = await User.updateOne({ _id: req.userId }, req.body)
        return res.json({msg: 'user details updated', response: response})
    }catch(error) {
        return res.status(403).json({msg: 'error occured', error: error})
    }
})

router.get('/bulk', async (req, res) => {
    const filter = req.query.filter || ""
    const regex = new RegExp(filter, 'i')

    const users = await User.find({username: {$regex: regex}})

    res.json({users: users.map(user => ({
        username: user.username,
        email: user.email,
        userId: user._id
    }))})
})

module.exports = router;