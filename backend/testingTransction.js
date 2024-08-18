const { default: mongoose } = require("mongoose")
const { Account } = require("./db")

async function solve(userId, {to, amount}) {
    const session = await mongoose.startSession()
    try {
        
        session.startTransaction()
        // const { amount, to } = req.body
        
        const account = await Account.findOne({userId}).session(session)
        if(!account || account.balance < amount) {
            await session.abortTransaction()
            return {msg: 'insufficiant bank balance'}
        }
        
        const toAccount = await Account.findOne({userId: to}).session(session)
        if(!toAccount) {
            await session.abortTransaction()
            return {msg: 'invalid account address'}
        }
        
        await Account.updateOne({userId}, {$inc: {balance: -amount}}).session(session)
        await Account.updateOne({userId: to}, {$inc: {balance: amount}}).session(session)
        
        await session.commitTransaction()
        return {
            msg: 'Transaction completed'
        }
    }catch(error){
        await session.abortTransaction()
        console.log({msg: 'Internal Server Error', error: error})
    }
}

for(let i=0; i < 5; i++) {
    solve(
        '66bcfd90a7bd6a601b0074ee',
        {
            to: '66bcfd64a7bd6a601b0074ea',
            amount: 1000,
        }
    )
}

