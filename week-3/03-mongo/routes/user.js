const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { Course, User } = require("../db");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;
    const search = await User.findOne({
        username
    })
    if (search){
        res.send("User Already Exists!!");
    }else{
    const response = await User.create({
        username,
        password,
        purchasedCources:[]
    })

    if (response){
        res.status(200).json({
            "msg": "User Created Successfully"
        })
    }
}
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const response = await Course.find({})
    res.send(response);
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const username = req.headers.username;
    const password = req.headers.password;
    const cId = req.params.courseId;
    const response = await User.updateOne(
        { username: username },
        { $push: { purchasedCources: cId } }
     )
    if (response.acknowledged){
        res.send(response)
    }else{
        res.send("Oops Something Went Wrong Try Later")
    }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const username = req.headers.username
    const response = await User.findOne({
        username
    })
    const courseArray = response.purchasedCources;
    let courses = [];
    for(let i = 0; i < courseArray.length; i++){
        const response = await Course.findById(courseArray[i]);
        courses.push(response);
    }
    res.send(`${courses}`);
})

module.exports = router