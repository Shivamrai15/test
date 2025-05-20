import { verifyToken } from "@clerk/express";

export async function authNMiddleware(req, res, next) {
  try {

    const session = req.cookies.__session;

    if (!session) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
        data: {}
      });
    }

    const isTokenValid = await verifyToken(session, {
      secretKey : process.env.CLERK_SECRET_KEY,
    });

    if (!isTokenValid) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
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
