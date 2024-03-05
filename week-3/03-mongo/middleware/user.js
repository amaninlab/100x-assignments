const { User } = require("../db")
async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    username = req.headers.username;
    password = req.headers.password;
    const responce = await User.findOne({
        username,
        password
    })

    if (responce){
        next();
    }else{
        res.status(403).json({"msg":"Forbidden User"});
    }
}

module.exports = userMiddleware;