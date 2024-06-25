const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const suggestionRoute = require('./routes/suggestion.route');
const productRoute = require('./routes/product.route');
const userRoute = require('./routes/user.route');
const { createUser, getUser } = require('./controllers/user.controller');
const authenticateToken = require('./middlewares/authenticateToken.js'); // Ensure the correct path

dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // Adjust based on your frontend URL
    credentials: true,
}));
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies

const PORT = process.env.PORT || 4000;
const URL = process.env.MONGO;

mongoose
    .connect(
        URL,
        // {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true
        // }
    )
    .then(() => console.log("Connected to MongoDB"))
    .catch(error => console.log(error));

// Route for creating a new user (registration)
app.post('/signup', createUser);

// Route for logging in a user
app.post('/login', getUser);

// Apply the authenticateToken middleware to routes that require authentication
app.use('/suggestion', authenticateToken, suggestionRoute);
app.use('/products', productRoute);
app.use('/users', authenticateToken, userRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
