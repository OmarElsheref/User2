const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());

const mongoDBConnectionString = 'mongodb+srv://omar:omar@cluster0.rsdgr1i.mongodb.net/flutter_app_db';

mongoose.connect(mongoDBConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.json());

app.post('/api/register', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || password !== confirmPassword) {
    return res.status(400).json({ message: 'Invalid data' });
  }

  const newUser = new User({
    name,
    email,
    password,
  });

  try {
    await newUser.save();
    res.status(201).json({ message: 'Account created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});