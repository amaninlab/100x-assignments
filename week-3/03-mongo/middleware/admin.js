// Middleware for handling auth
const { Admin } = require("../db")
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    username = req.headers.username;
    password = req.headers.password;
    const responce = await Admin.findOne({
        username,
        password
    })

    if (responce){
        next();
    }else{
        res.status(403).json({"msg":"Forbidden User"});
    }
}


module.exports = adminMiddleware;