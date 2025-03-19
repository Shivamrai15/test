import * as z from "zod";
import { DateSchema } from "./date.schema.js";

export const EmployeeSchema = z.object({
    employeeId : z.string().min(3).max(10),
    name : z.string().min(1).max(50),
    email : z.string().email(),
    dob :  DateSchema,
    joiningDate : DateSchema,
    baseSalary : z.number().min(0),
    variablePay : z.number().min(0),
    anniversaryDate : DateSchema.optional(),
    address : z.object({
        streetAddress : z.string().min(1).max(50),
        city : z.string().min(1).max(50),
        state : z.string().min(1).max(50),
        country : z.string().min(1).max(50),
        pincode : z.string().min(1).max(50),
    }),
    paymentEvents : z.array(z.object({
        occasion : z.string().min(1).max(50),
        paymentType : z.enum(["INSURANCE", "ANNIVERSARY", "BIRTHDAY", "DIWALI"]),
        amount : z.number().min(0),
        reminderDate : DateSchema,
        eventDate : DateSchema,
    })),
    spouse : z.object({
        name : z.string().min(1).max(50),
        dob : DateSchema,
    }).optional(),
    kids : z.array(z.object({
        name : z.string().min(1).max(50),
        dob : DateSchema,
    })),
});




export const UpdateEmployeeSchema = z.object({
    employeeId : z.string().min(3).max(50).optional(),
    name : z.string().min(1).max(50).optional(),
    email : z.string().email().optional(),
    dob :  DateSchema.optional(),
    joiningDate : DateSchema.optional(),
});