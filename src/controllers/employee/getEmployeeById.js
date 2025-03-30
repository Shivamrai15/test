import * as z from "zod";
import { db } from "../../db.js";
import { getEmployeeFinancialYear } from "../../lib/utils.js";


const querySchema = z.object({
    year: z.string().refine((value)=>{
        const parsedYear = Number.parseInt(value, 10);
        if (isNaN(parsedYear)) return false;  
        return parsedYear >= 2018 && parsedYear <= new Date().getFullYear();  
    })
})


export const getEmployeeById = async(req, res) => {
    try {
        
        const { id } = req.params;
        const query = req.query;

        if (!id) {
            return res.status(400).json({
                success: false, 
                message: "Employee Id is required",
                data : {}
            });
        }

        let year = new Date().getFullYear();

        const validateQuery = await querySchema.safeParseAsync(query);
        if (validateQuery.success) {
            year = validateQuery.data.year
        }

        const employee = await db.employee.findUnique({
            where : {
                id
            },
            include : {
                paymentEvents : {
                    where : {
                        eventDate : {
                            gte : new Date(`${year}-01-01`),
                            lte : new Date(`${year}-12-31`)
                        }                    
                    },
                    orderBy : {
                        eventDate : "desc"
                    },  
                },
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

        const eventMinMaxYears = await db.paymentEvent.aggregateRaw({
            pipeline: [
                {
                    $match: {
                        employeeId: { 
                            $oid: employee.id
                        }
                    }
                },
                {
                    $group: {
                        _id: null,
                        minEventDate: { $min: "$eventDate" },
                        maxEventDate: { $max: "$eventDate" }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        minEventDate: 1,
                        maxEventDate: 1
                    }
                }
            ]
        });
        
        if (eventMinMaxYears.length === 0 || !eventMinMaxYears[0]) {
            return res.status(200).json({
                success: true, 
                message: "Employee found successfully",
                data : {
                    employee,
                    financialYears : []
                }
            });
        }

        const financialYears = getEmployeeFinancialYear(new Date(eventMinMaxYears[0].minEventDate["$date"]), new Date(eventMinMaxYears[0].maxEventDate["$date"]));

        return res.status(200).json({
            success: true, 
            message: "Employee found successfully",
            data : {
                employee,
                financialYears
            }
        });

    } catch (error) {
        console.error("GET EMPLOYEE BY ID API ERROR: ", error);
        return res.status(500).json({
            success: false, 
            message: `Internal Server Error. ${error?.message}`,
            data : {}
        });
    }
}