const bcrypt = require('bcrypt');
const User = require("../models/user");
const Emp = require("../models/emp");

const { setUser } = require("../service/authication");

async function UserCreate(req, res) {
    const { userId,role,name,password,area } = req.body;
    console.log(req.body);
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Using create method to both create and save the user
        const user = await User.create({ userId,role,name,password:hashedPassword,area });
        
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user' });
    } 
}

async function UserLogin(req, res) {
    const { userId, password,role } = req.body;
    console.log("Login request received for role:", role, "username:", username);
    
    let user;
    if (role === "admin") {
        user = await Admin.findOne({ userId });
    } else if (role === "emp") {
        user = await Emp.findOne({ userId});
    } else if (role === "salemanager") {  
        user = await SalesManager.findOne({ userId });
    }

    if (!user) {
        console.log("User not found with username:", userId);
        return res.status(404).json({ message: 'Invalid username or password' });
    }

    // Compare the password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }

    const token = setUser(user);
    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'None' });
    res.status(200).json({ message: `${role.charAt(0).toUpperCase() + role.slice(1)} login successful`, user, token });
}

module.exports = {
    UserCreate,
    UserLogin
};
