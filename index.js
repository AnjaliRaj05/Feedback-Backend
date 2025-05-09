const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const feedbackRoutes = require('./routes/feedbackRoutes');

dotenv.config(); 
connectDB(); 

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'https://feedback-form-sigma-eight.vercel.app',
  'https://feedback-form-git-main-anjali-rajs-projects.vercel.app',
  'https://feedback-form-7xef9bw1b-anjali-rajs-projects.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));

app.use(express.json()); 
app.use('/api/v1', feedbackRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} in ${process.env.DEV_MODE} mode`));
