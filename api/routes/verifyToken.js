const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token
    if (!authHeader) {
        res.status(401).json('You are not verified!')
    } else {
        const token = authHeader.split(' ')[1]

        if (authHeader) {
            jwt.verify(token, process.env.JWT_SEC, (err, user) => {
                if (err) {
                    res.status(403).json('Token is not valid!')
                } else {
                    req.user = user
                    next()
                }
            })
        } else {
            res.status(401).json('You are not verified!')
        }
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            res.status(403).json('You are not allowed to do that!')
        }
    })
}
const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next()
        } else {
            res.status(403).json('You are not allowed to do that!')
        }
    })
}
module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin }
