const jwt = require("jsonwebtoken")
const JWT_SECRET = require("../config");

function signinMiddleware(req, res, next) {
    const auth = req.headers.authorization

    if(!auth || !auth.startsWith('Bearer ')) return res.status(403).json({msg: 'invalid token'})

    const token = auth && auth.split(' ')[1]
 
    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        if(decoded.username !== req.body.username) return res.status(403).json({msg: "token doesn't match"})

        req.userId = decoded.userId

        next()       
    }catch(error) {
        return res.status(403).json({msg: "token doesn't match", err: error})
    }

}

module.exports = signinMiddleware