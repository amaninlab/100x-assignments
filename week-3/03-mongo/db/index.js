const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:##############.####.mongodb.net/week-3');

// Define schemas
const AdminSchema = new mongoose.Schema({
    username: String,
    password: String
});


const CourseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imagelink: String
});
const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchasedCources: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
});


const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}
