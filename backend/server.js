const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

connectDB();

const PORT = process.env.PORT || 5000;

const userRoute = require('./routes/userRoute');
const materialRoutes = require('./routes/materialRoutes');
const budgetRoutes = require('./routes/budgetRoutes');

app.use('/api/auth', userRoute);

app.get('/', (req, res) => {
    res.send('API is running...');
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

