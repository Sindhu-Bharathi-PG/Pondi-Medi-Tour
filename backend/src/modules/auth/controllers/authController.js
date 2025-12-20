const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { eq } = require('drizzle-orm');
const db = require('../../../config/database');
const { users } = require('../models/User');

const login = async (request, reply) => {
  console.error('=== LOGIN CONTROLLER REACHED ===');
  
  const { email, password } = request.body;
  console.error('Email:', email, 'Password provided:', !!password);

  try {
    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
    console.error('User query result:', !!user);
    
    if (!user) {
      console.error('User not found');
      return reply.code(401).send({ error: 'Invalid credentials' });
    }

    console.error('User found:', user.id, user.email);
    
    const isValidPassword = await bcrypt.compare(password, user.password);
    console.error('Password valid:', isValidPassword);
    
    if (!isValidPassword) {
      console.error('Password mismatch');
      return reply.code(401).send({ error: 'Invalid credentials' });
    }

    console.error('Login successful!');
    
    const token = jwt.sign(
      { userId: user.id, userType: user.userType },
      process.env.JWT_SECRET || 'your-super-secret-key-change-this-in-production',
      { expiresIn: '24h' }
    );

    reply.send({ token, user: { id: user.id, email: user.email, userType: user.userType } });
  } catch (error) {
    console.error('Login error:', error);
    request.log.error(error);
    reply.code(500).send({ error: 'Internal server error' });
  }
};

const register = async (request, reply) => {
  const { email, password, userType } = request.body;

  try {
    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (existingUser.length > 0) {
      return reply.code(409).send({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_ROUNDS) || 12);

    const [newUser] = await db.insert(users).values({
      email,
      password: hashedPassword,
      userType,
    }).returning();

    const token = jwt.sign(
      { userId: newUser.id, userType: newUser.userType },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    reply.code(201).send({ token, user: { id: newUser.id, email: newUser.email, userType: newUser.userType } });
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

const verifyCredentialsForRole = async (request, reply) => {
  const { email, password } = request.body;

  try {
    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
    
    if (!user) {
      return reply.code(401).send({ error: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return reply.code(401).send({ error: 'Invalid credentials' });
    }

    // Update last login
    await db.update(users).set({ lastLogin: new Date() }).where(eq(users.id, user.id));

    // Return role information for redirect logic
    return reply.send({
      userType: user.userType,
      requiresRedirect: user.userType === 'superadmin',
      redirectUrl: user.userType === 'superadmin' ? '/dashboard/superadmin' : null,
    });
  } catch (error) {
    request.log.error(error);
    reply.code(500).send({ error: 'Internal server error' });
  }
};

module.exports = {
  login,
  register,
  logout,
  refreshToken,
  setupMFA,
  verifyMFA,
  verifyCredentialsForRole,
};
