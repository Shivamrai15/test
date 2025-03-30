import { db } from "../../db.js";
import { EventSchema } from "../../schemas/event.schema.js";

export const updateEventController = async (req, res) => {
    const { eventId } = req.params;
    const body = req.body;
    const validatedData = await EventSchema.safeParseAsync(body);
    if(!validatedData.success) {
        return res.status(400).json({
            success: false,
            message: "Invalid event data",
            data: {},
        });
    }
    try {
        const event = await db.paymentEvent.findUnique({
            where: {
                id: eventId,
                isActive: true,
            },
        });

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found for this employee",
                data: {},
            });
        }

        const updatedEvent = await db.paymentEvent.update({
            where: {
                id: eventId,
            },
            data: {
                ...body,
                reminderDate: body.reminderDate ? new Date(body.reminderDate) : null,
                eventDate: body.eventDate ? new Date(body.eventDate) : null,
                paymentDate: body.paymentDate ? new Date(body.paymentDate) : null,
                paymentConfirmed: body.paymentConfirmed ? new Date(body.paymentConfirmed) : null,
                updatedBy:"Maninder Singh",
            },
        });

        return res.status(200).json({
            success: true,
            message: "Event updated successfully",
            data: updatedEvent,
        });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Internal Server Error. ${error?.message}`,
            data: {},
        });
    }
}