import { Router } from "express";
import { getAllEventsController } from "../controllers/event/getAllEventsController.js";
import { deleteEventController } from "../controllers/event/deleteEventController.js";  
import { getEventByIdController } from "../controllers/event/getEventByIdController.js";    
import { createEventController } from "../controllers/event/createEventController.js";
import { updateEventController } from "../controllers/event/updateEventController.js";

export const eventRouter = Router(); 

eventRouter.get("/getAllEvents", getAllEventsController);
eventRouter.get("/:eventId", getEventByIdController);       
eventRouter.post("/", createEventController);
eventRouter.put("/:eventId", updateEventController);
eventRouter.delete("/:eventId", deleteEventController);