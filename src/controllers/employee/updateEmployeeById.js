import { UpdateEmployeeSchema } from "../../schemas/employee.schema.js";
import { db } from "../../db.js";


export const updateEmployeeById = async (req, res) => {
    try {
       
        const { id } = req.params;
        const body = req.body;
        const validatedData = await UpdateEmployeeSchema.safeParseAsync(body);
       
        if (!validatedData.success) {
            return res.status(400).json({
                success: false,
                message: 'Invalid employee data',
                data : {}
            });
        }

        const employee = await db.employee.findUnique({
            where: {
                id
            }
        });

        if (!employee || !employee.isActive) {
            return res.status(404).json({
                success: false,
                message: 'Employee not found',
                data : {}
            });
        }

        const data = validatedData.data;
        const existingKids = data.kids.filter((kid)=>kid.id!==undefined);
        const newKids = data.kids.filter((kid)=>kid.id===undefined);

        const updatedEmployee = await db.employee.update({
            where: {
                id
            },
            data: {
                ...data,
                dob : new Date(data.dob),
                joiningDate : new Date(data.joiningDate),
                anniversaryDate : data.anniversaryDate ? new Date(data.anniversaryDate) : null,
                spouse : data.spouse? {
                    upsert : {
                        ...data.spouse,
                        dob : new Date(data.spouse.dob),
                        updatedBy : "Maninder Singh"
                    }
                } : undefined,
                address : {
                    update : {
                        ...data.address,
                        updatedBy : "Maninder Singh"
                    }
                },
                paymentEvents : {
                    updateMany : [
                        {
                            where : {
                                employeeId : employee.id,
                                paymentType : "BIRTHDAY",
                            },
                            data : {
                                eventDate : new Date(data.dob),
                                reminderDate : new Date(new Date(data.dob)-3),
                                updatedBy : "Maninder Singh"
                            }
                        },
                        data.anniversaryDate ? {
                            where : {
                                employeeId : employee.id,
                                paymentType : "ANNIVERSARY",
                            },
                            data : {
                                eventDate : new Date(data.anniversaryDate),
                                reminderDate : new Date(new Date(data.anniversaryDate)-3),
                                updatedBy : "Maninder Singh"
                            }
                        } : undefined,
                    ]
                },
                kids : {
                    updateMany : existingKids.map(kid=>({
                        where : {
                            id : kid.id
                        },
                        data : {
                            ...kid,
                            dob : new Date(kid.dob),
                            updatedBy : "Maninder Singh"
                        }
                    })),
                    createMany : newKids.map(kid=>({
                        ...kid,
                        dob : new Date(kid.dob),
                        createdBy : "Maninder Singh",
                        updatedBy : "Maninder Singh"
                    }))
                },
            }
        });

        return res.status(200).json({
            success: true,
            message: 'Employee updated successfully',
            data : updatedEmployee
        });

    } catch (error) {
        console.error("UPDATE EMPLOYEE BY ID API ERROR: ", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            data : {}
        });
    }
}
