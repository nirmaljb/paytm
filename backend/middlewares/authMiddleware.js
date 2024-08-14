const zod = require("zod")
const { z } = zod

function authMiddleware(req, res, next) {
    const { username, email, password } = req.body;
    const schema = z.object({
        username: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(8)
    })

    const response = schema.safeParse({username, email, password})
    if(!response.success) {
        return res.json({msg: 'invalid user inputs', error: response.error})
    }
    next();
}

module.exports = authMiddleware