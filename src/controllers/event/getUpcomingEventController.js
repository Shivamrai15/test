import { db } from '../../db.js';
import { QuerySchema } from '../../schemas/query.schema.js';

export const getUpcomingEventController = async (req, res) => {
  try {
    const query = req.query;
    const parsedQuery = await QuerySchema.safeParseAsync(query);
    if (!parsedQuery.success) {
      return res.status(400).json({
        success: false,
        message: 'Invalid query parameters',
        data: parsedQuery.error.errors
      });
    }
    const { page, limit, order } = parsedQuery.data;

    const today = new Date();
    const twoDaysBack = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2);
    const yearEndDate = new Date(today.getFullYear(), 11, 31);

    const totalEvents = await db.paymentEvent.count({
      where: {
        isActive: true,
        eventDate: {
          gte: twoDaysBack,
          lte: yearEndDate
        }
      }
    });

    if (totalEvents === 0) {
      return res.status(404).json({
        success: false,
        message: 'No events found',
        data: []
      });
    }

    const upcomingEvents = await db.paymentEvent.findMany({
      where: {
        isActive: true,
        eventDate: {
          gte: twoDaysBack,
          lte: yearEndDate
        }
      },
      orderBy: {
        eventDate: order
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
      skip: (page - 1) * limit,
      take: limit
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
      data: {
        upcomingEvents,
        totalEvents,
        page,
        limit
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server error,${error.message}`
    });
  }
};
