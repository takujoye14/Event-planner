const bcrypt = require('bcrypt');
const User = require('../models/User');

// POST /api/users/register
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const { password: _, ...safeUser } = newUser.toObject();

    res.status(201).json({ message: 'User registered successfully', user: safeUser });
  } catch (err) {
    console.error('❌ Registration error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// POST /api/users/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

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

    const { password: _, ...safeUser } = user.toObject();

    res.status(200).json({ message: 'Login successful', user: safeUser });
  } catch (err) {
    console.error('❌ Login error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
