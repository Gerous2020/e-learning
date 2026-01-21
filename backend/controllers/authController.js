const jwt = require('jsonwebtoken');

// DEMO DATA STORAGE
let users = [];

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
        expiresIn: '30d'
    });
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
const authUser = async (req, res) => {
    const { email, password } = req.body;

    // Demo Logic: Check array
    const user = users.find(u => u.email === email);

    if (user && user.password === password) { // Simple password check for demo
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

// @desc    Register a new user
// @route   POST /api/auth/register
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = users.find(u => u.email === email);
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = {
        _id: Date.now().toString(),
        name,
        email,
        password, // Storing plain text for demo simplicity
        isAdmin: false
    };

    users.push(newUser);

    res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        token: generateToken(newUser._id)
    });
};

module.exports = { authUser, registerUser };
