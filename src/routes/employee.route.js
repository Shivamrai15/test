import { Router } from "express";
import {
    getEmployees,
    getEmployeeById,
    createEmployee,
    deleteEmployee,
    updateEmployeeById
} from "../controllers/employee/employee.js";

export const employeeRouter = Router();


employeeRouter.get("/getAllEmployees", getEmployees);
employeeRouter.get("/:id", getEmployeeById);
employeeRouter.post("/", createEmployee);
employeeRouter.patch("/:id", updateEmployeeById);
employeeRouter.delete("/:id", deleteEmployee);