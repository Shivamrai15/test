import { db } from '../../db.js';
import { QuerySchema } from '../../schemas/query.schema.js';

export const getAllEventsController = async (req, res) => {
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

    const totalEvents = await db.paymentEvent.count();
    if (totalEvents === 0) {
      return res.status(404).json({
        success: false,
        message: 'No events found',
        data: []
      });
    }
    const events = await db.paymentEvent.findMany({
      take: limit,
      skip: (page - 1) * limit,
      orderBy: {
        createdAt: order
      }
    });
    return res.status(200).json({
      success: true,
      message: 'Events found successfully',
      data: {
        events,
        totalEvents,
        page,
        limit
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error. ${error?.message}`,
      data: {}
    });
  }
};
