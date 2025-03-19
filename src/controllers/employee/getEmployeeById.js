import { db } from "../../db.js";

export const getEmployeeById = async(req, res) => {
    try {
        
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false, 
                message: "Employee Id is required",
                data : {}
            });
        }

        const employee = await db.employee.findUnique({
            where : {
                id
            },
            include : {
                paymentEvents : true,
                kids : true,
                spouse : true,
                address : true
            },
        });

        if (!employee) {
            return res.status(404).json({
                success: false, 
                message: "Employee not found",
                data : {}
            });
        }

        return res.status(200).json({
            success: true, 
            message: "Employee found successfully",
            data : employee
        });

    } catch (error) {
        console.error("GET EMPLOYEE BY ID API ERROR: ", error);
        return res.status(500).json({
            success: false, 
            message: "Internal Server Error",
            data : {}
        });
    }
}



const checkEvents = async()=>{
    const events = await db.event.findMany({
        where : {
            AND : [
                {
                    eventDate : {
                        gte : new Date(),
                        lte : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                    }
                },
                {
                    paid : {
                        is : null
                    }
                }
            ]
        },
        include : {
            employee : {
                select :{
                    email : true
                }
            }
        }
    });

    events.forEach(async(event)=>{
        await sendEmail({
            email : event.employee.email,
            title : event.title,
            description : event.description,
            amount : event.amount
        })
    })
}