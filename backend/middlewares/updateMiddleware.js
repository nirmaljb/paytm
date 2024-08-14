const zod = require("zod")
const { z } = zod

function updateMiddleware(req, res, next) {
    const schema = zod.object({
        username: z.string().optional(),
        email: z.string().optional(),
    })

    const { success } = schema.safeParse(req.body)
    if(!success) {
        return res.status(403).json({msg: 'invalid user inputs', error: response.error})
    }
    next()
}

module.exports = updateMiddleware