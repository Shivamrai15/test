import { db } from '../../db.js';

export const getUpcomingEventController = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    if (pageNumber < 1 || limitNumber < 1) {
      return res.status(400).json({
        success: false,
        message: 'Invalid pagination parameters',
        data: {}
      });
    }
    const today = new Date();
    const twoDaysBack = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2);
    const yearEndDate = new Date(today.getFullYear(), 11, 31);
    const upcomingEvents = await db.paymentEvent.findMany({
      where: {
        isActive: true,
        eventDate: {
          gte: twoDaysBack,
          lte: yearEndDate
        }
      },
      orderBy: {
        eventDate: 'desc'
      },
      include: {
        employee: {
          select: {
            id: true,
            name: true,
            email: true,
            variablePay: true,
            baseSalary: true
          }
        }
      },
      skip: (pageNumber - 1) * limitNumber,
      take: limitNumber
    });
    if (upcomingEvents.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No upcoming events found',
        data: {}
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Events fetched successfully',
      data: upcomingEvents
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server error,${error.message}`
    });
  }
};
