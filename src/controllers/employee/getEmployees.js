import { db } from "../../db.js";

export const getEmployees = async(req, res) => {
    try {
        
        const employees = await db.employee.findMany({
            include : {
                address : true
            },
        });

        return res.status(200).json({
            success: true,
            message: "Employees found successfully",
            data: employees
        });

    } catch (error) {
        console.error("GET ALL EMPLOYEES API ERROR: ", error);
        return res.status(500).json({
            success: false, 
            message: "Internal Server Error",
            data : {}
        });
    }
}