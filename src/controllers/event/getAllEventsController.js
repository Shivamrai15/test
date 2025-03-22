import { db } from "../../db.js";

export const getAllEventsController = async (req, res) => {
    try {
        const events = await db.paymentEvent.findMany({
            orderBy: {
                eventDate: "desc",
            },
        });

        return res.status(200).json({
            success: true,
            message: "Events fetched successfully",
            data: events,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            data: {},
        });
    }
};
