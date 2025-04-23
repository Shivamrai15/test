import { db } from '../../db.js';

export const getEventByIdController = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await db.paymentEvent.findUnique({
      where: {
        id: eventId,
        isActive: true
      }
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
        data: {}
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Event fetched successfully',
      data: event
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error. ${error?.message}`,
      data: {}
    });
  }
};
