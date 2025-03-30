import { db } from "../../db.js";

export const deleteEmployee = async (req, res) => {
    try {
        
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Employee Id is required",
                data: {}
            });
        }

        const employee = await db.employee.findUnique({
            where : {
                id
            },
            select : {
                id : true,
                isActive : true
            }
        });

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found",
                data: {}
            });
        }

        if (!employee.isActive) {
            return res.status(400).json({
                success: false,
                message: "Employee is already disabled",
                data: {}
            });
        }

        const updatedEmployee = await db.employee.update({
            where : {
                id
            },
            data : {
                isActive : false,
                address : {
                    update : {
                        isActive : false
                    }
                },
                paymentEvents : {
                    updateMany :{
                        where : {
                            employeeId : employee.id
                        },
                        data : {
                            isActive : false
                        }
                    }
                }
            }
        });



        return res.status(200).json({
            success: true,
            message: "Employee disabled successfully",
            data: updatedEmployee
        });


    } catch (error) {
        console.error("DELETE EMPLOYEE API ERROR: ", error);
        return res.status(500).json({
            success: false, 
            message: `Internal Server Error. ${error?.message}`,
            data : {}
        });
    }
}