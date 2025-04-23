import jwt from 'jsonwebtoken';

export const generateToken = ({ eventId, employeeId, employeeEmail }) => {
  const token = jwt.sign(
    {
      eventId,
      employeeId,
      employeeEmail
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '2d',
      algorithm: 'RS256',
      issuer: process.env.JWT_ISSUER
    }
  );
  return token;
};

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      issuer: process.env.JWT_ISSUER,
      algorithms: ['RS256']
    });

    if (!decoded) {
      return null;
    }
    return decoded;
  } catch (error) {
    return null;
  }
};
