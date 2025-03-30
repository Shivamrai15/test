import { db } from "../../db.js";

export const deleteEventController = async (req, res) => {
    try {
        const { eventId } = req.params;

        const existingEvent = await db.paymentEvent.findUnique({
            where: { id: eventId, isActive: true },
        });

        if (!existingEvent) {
            return res.status(404).json({
                success: false,
                message: "Event not found",
                data: {},
            });
        }

        await db.paymentEvent.update({
            where: { id: eventId },
            data:{
                updatedBy: "Maninder Singh",
                isActive: false
            }
        });

        return res.status(200).json({
            success: true,
            message: "Event deleted successfully",
            data: {},
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Internal Server Error. ${error?.message}`,
            data: {},
        });
    }
};
