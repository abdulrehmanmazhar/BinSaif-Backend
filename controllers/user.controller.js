const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../models/user.model');

const JWT_SECRET = 'your_jwt_secret'; // Use a secure secret in a real application

module.exports = {
    getUser: async (req, res) => {
        const { email, password } = req.body;
        try {
            const info = await user.findOne({ email: email });
            if (!info) {
                console.log("User not found");
                return res.status(404).json("User not found");
            }
            // Compare the provided password with the stored hashed password
            const match = await bcrypt.compare(password, info.password);
            if (match) {
                // Generate JWT
                const token = jwt.sign({ id: info._id, email: info.email }, JWT_SECRET, { expiresIn: '1h' });

                // Store JWT in cookie
                res.cookie('token', token, { httpOnly: true });

                return res.status(200).json("Login successful");
            } else {
                return res.status(401).json("Invalid credentials");
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    createUser: async (req, res) => {
        const { name, email, password } = req.body;
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            const newUser = new user({
                name: name,
                email: email,
                password: hash
            });
            const savedUser = await newUser.save();

            // Generate JWT
            const token = jwt.sign({ id: savedUser._id, email: savedUser.email }, JWT_SECRET, { expiresIn: '1h' });

            // Store JWT in cookie
            res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'None' });
        // Adjust 'secure' for HTTPS
            

            return res.status(201).json(savedUser);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    }
};
