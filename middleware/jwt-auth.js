const jwt = require("jsonwebtoken");

const auth = async (req,res,next)=>{

    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'PrivateKey')
        console.log('decodeddToken', decoded)
        req.user = decoded;
        next()
        } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
        }
}
module.exports = auth;
