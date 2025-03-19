import { Router } from "express";
import {
    getEmployees,
    getEmployeeById,
    createEmployee,
    deleteEmployee,
} from "../controllers/employee/employee.js";

export const employeeRouter = Router();


employeeRouter.get("/getAllEmployees", getEmployees);
employeeRouter.get("/:id", getEmployeeById);
employeeRouter.post("/", createEmployee);
employeeRouter.delete("/:id", deleteEmployee);