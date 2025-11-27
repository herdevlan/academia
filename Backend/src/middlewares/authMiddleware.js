
const jwt = require('jsonwebtoken');
const { User } = require('../../models');

module.exports = async function authMiddleware(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;

  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(payload.id);
    if (!user) {
      return res.status(401).json({ message: 'Invalid token - user not exist' });
    }

    req.user = {
      id: user.id,
      role: user.role,
      email: user.email
    };

    next();
  } catch (err) {
    return res.status(401).json({
      message: 'Invalid token',
      error: err.message
    });
  }
};

