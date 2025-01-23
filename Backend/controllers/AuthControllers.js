const UserModel = require("../model/UserModel");
const User = require("../model/UserModel");
const bcrypt = require('bcryptjs');
const jwt= require("jsonwebtoken")
const dotenv= require("dotenv")
dotenv.config();


const register = async (req, res) => {


  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user instance
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role, 
    });
    const savedUser = await user.save();
  
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: savedUser._id, 
        name: savedUser.name,
        email: savedUser.email, 
        role: savedUser.role, 
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Error registering user" }); // Generic error message for security
  }
};



// Login Controller
const login = async (req, res) => {

  const { email, password } = req.body;
  
  try {
  
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }


    // Generate the JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

  
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: error.message });
  }
};

const getUserDetails = async (req, res) => {
  
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const checkMail= async (req, res) => {

  
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: 'Email not found' });
    }

    res.json({ success: true,
      msg: 'Email not found'
     });

  } catch (error) {
    res.status(500).json({
      message:"not found"
    })
    
  }

};


const reset = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ msg: 'Email not found' });
  }
  user.password = await bcrypt.hash(password, 10);
  await user.save();
  res.json({ success: true });
}

module.exports= {register,
  login,
  getUserDetails,
  checkMail,
  reset
}