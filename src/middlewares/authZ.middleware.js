import jwt from "jsonwebtoken";
import { db } from '../db.js';

export async function authZMiddleware(req, res, next) {
  try {

    const sessionToken = req.headers.authorization?.split(' ')[1];

    if (!sessionToken) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
        data: {}
      });
    }

    const clerkUser = jwt.decode(sessionToken);

    if (!clerkUser.email) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
        data: {}
      });
    }

    const user = await db.user.findUnique({
      where: {
        email: clerkUser.email
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        data: {}
      });
    }

    if (user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'Forbidden',
        data: {}
      });
    }

    next();

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal server error: ${error.message}`,
      data: {}
    });
  }
}
