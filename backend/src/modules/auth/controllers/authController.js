const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const login = async (request, reply) => {
  const { email, password } = request.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return reply.code(401).send({ error: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return reply.code(401).send({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    reply.send({ token, user: { id: user._id, email: user.email, userType: user.userType } });
  } catch (error) {
    request.log.error(error);
    reply.code(500).send({ error: 'Internal server error' });
  }
};

const register = async (request, reply) => {
  const { email, password, userType } = request.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return reply.code(409).send({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_ROUNDS) || 12);

    const user = new User({
      email,
      password: hashedPassword,
      userType,
    });

    await user.save();

    const token = jwt.sign(
      { userId: user._id, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    reply.code(201).send({ token, user: { id: user._id, email: user.email, userType: user.userType } });
  } catch (error) {
    request.log.error(error);
    reply.code(500).send({ error: 'Internal server error' });
  }
};

const logout = async (request, reply) => {
  // In a real app, you might want to blacklist the token
  reply.send({ message: 'Logged out successfully' });
};

const refreshToken = async (request, reply) => {
  // Implement token refresh logic
  reply.send({ message: 'Token refresh not implemented yet' });
};

const setupMFA = async (request, reply) => {
  // Implement MFA setup
  reply.send({ message: 'MFA setup not implemented yet' });
};

const verifyMFA = async (request, reply) => {
  // Implement MFA verification
  reply.send({ message: 'MFA verification not implemented yet' });
};

module.exports = {
  login,
  register,
  logout,
  refreshToken,
  setupMFA,
  verifyMFA,
};
