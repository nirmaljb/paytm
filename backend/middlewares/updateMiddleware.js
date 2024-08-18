const zod = require("zod")
const { z } = zod

function updateMiddleware(req, res, next) {
    const schema = zod.object({
        new_username: z.string().optional(),
        email: z.string().optional(),
    })

    const { new_username, email } = req.body 
    const { success } = schema.safeParse({new_username, email})
    if(!success) {
        return res.status(403).json({msg: 'invalid user inputs', error: response.error})
    }
    next()
}

module.exports = updateMiddleware