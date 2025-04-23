import { db } from '../../db.js';

export const confirmPaymentController = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Token is required',
        data: {}
      });
    }
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: 'Token has expired or is invalid',
        data: {}
      });
    }

    const { eventId } = decoded;
    const paymentEvent = await db.paymentEvent.findUnique({
      where: {
        id: eventId,
        isActive: true
      }
    });

    if (!paymentEvent) {
      return res.status(404).json({
        success: false,
        message: 'Payment event not found',
        data: {}
      });
    }

    if (paymentEvent.paymentConfirmed) {
      return res.status(400).json({
        success: false,
        message: 'Payment already confirmed',
        data: {}
      });
    }

    const updatedPaymentEvent = await db.paymentEvent.update({
      where: {
        id: paymentEvent.id
      },
      data: {
        paymentConfirmed: new Date()
      }
    });

    if (!updatedPaymentEvent) {
      return res.status(500).json({
        success: false,
        message: 'Error while updating payment event',
        data: {}
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Payment confirmed successfully',
      data: updatedPaymentEvent
    });
  } catch (error) {
    console.error('Error in confirmPaymentController:', error);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error. ${error?.message}`,
      data: {}
    });
  }
};
