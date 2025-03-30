import { EventSchema } from "../../schemas/event.schema.js";
import { db } from "../../db.js";


export const createEventController = async (req, res) => {
    try {
        const body = req.body;
        const validatedData = await EventSchema.safeParseAsync(body);
        if (!validatedData.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid event data",
                data: {},
            });
        }
        const data = validatedData.data;
        const { employeeId } = validatedData.data;
        const employee = await db.employee.findUnique({
            where: {
                id: employeeId,
                isActive: true,
            },
            select: {
                id: true,
                variablePay: true,
                paymentEvents:{
                where:{
                    paymentType:{
                    not:"SALARY"
                    },
                    eventDate:{
                    gte:new Date(new Date().getFullYear(),0,1)
                    }
                },
                select:{
                    id:true,
                    amount:true,
                }
                },
            
            },
        });
        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found or inactive",
                data: {},
            });
        }
        const totalActiveVariablePay = employee.paymentEvents.reduce((current,event)=>{
            return current + event.amount;
        },0);
        if(totalActiveVariablePay + data.amount > employee.variablePay){
            return res.status(400).json({
                success: false,
                message: "Employee variable pay exceeded",
                data: {},
            });
        }
        const event = await db.paymentEvent.create({
            data: {
                ...data,
                reminderDate: new Date(data.reminderDate),
                eventDate: new Date(data.eventDate),
                paymentDate: data.paymentDate ? new Date(data.paymentDate) : null,
                paymentConfirmed: data.paymentConfirmed
                ? new Date(data.paymentConfirmed)
                : null,
                createdBy:"Maninder Singh",
                updatedBy:"Maninder Singh",
            },
        });
        return res.status(201).json({
            success: true,
            message: "Event created successfully",
            data: event,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Internal Server Error. ${error?.message}`,
            data: {},
        });
    }
};
