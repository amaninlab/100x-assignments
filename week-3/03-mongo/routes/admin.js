const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db")

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    const search = await Admin.findOne({
        username
    })
    if (search){
        res.send("User Already Exists!!");
    }else{
    const response = await Admin.create({
        username,
        password
    })

    if (response){
        res.status(200).json({
            "msg": "Admin Created Successfully"
        })
    }
}
});

router.post('/courses', adminMiddleware, async(req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imagelink = req.body.imagelink;
    const search = await Course.findOne({
        title,
        description,
        price,
    })
    if (search){
        res.send("Course Already Exists!!");
    }else{
    const response = await Course.create({
        title,
        description,
        price,
        imagelink
    })
    if (response){
        res.send(`Course Created Successfully CourseId is ${response._id}`)
    }else{
        res.status(500).json({"msg": "Internal Server Error"})
    }
}


});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const response = await Course.find({});

    res.send(response);


});

module.exports = router;