const bcrypt = require('bcrypt');
const User = require('../models/user.model');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("Registration request:", req.body);

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });

    console.log("User created:", newUser);
    res.status(201).json({ user: newUser });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login request:", req.body);

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    res.json({ message: 'Login successful', user });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
};
