const express = require("express")
const { Account, User } = require("../db")
const signinMiddleware = require("../middlewares/signinMiddleware")
const authMiddleware = require("../middlewares/authMiddleware")
const { default: mongoose } = require("mongoose")
const router = express.Router()

router.get("/balance", signinMiddleware, async (req, res) => {
    const response = await Account.findOne({userId: req.headers.userid})

    if(!response) return res.status(403).json({msg: "Not Account with that id"})
    
    res.json({balance: response.balance})

})

router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession()

    session.startTransaction()
    const { amount, to } = req.body

    const account = await Account.findOne({userId: req.headers.userid}).session(session)
    if(!account || account.balance < amount) {
        await session.abortTransaction()
        return res.status(400).json({msg: 'insufficiant bank balance'})
    }

    const toAccount = await Account.findOne({userId: to}).session(session)
    if(!toAccount) {
        await session.abortTransaction()
        return res.status(400).json({msg: 'invalid account address'})
    }

    await Account.updateOne({userId: req.headers.userid}, {$inc: {balance: -amount}}).session(session)
    await Account.updateOne({userId: to}, {$inc: {balance: amount}}).session(session)

    await session.commitTransaction()
    res.json({
        msg: 'Transaction completed'
    })


})

module.exports = router;