import { Router } from 'express';
import { getAllEventsController } from '../controllers/event/getAllEventsController.js';
import { deleteEventController } from '../controllers/event/deleteEventController.js';
import { getEventByIdController } from '../controllers/event/getEventByIdController.js';
import { createEventController } from '../controllers/event/createEventController.js';
import { updateEventController } from '../controllers/event/updateEventController.js';
import { getUpcomingEventController } from '../controllers/event/getUpcomingEventController.js';

export const eventRouter = Router();

eventRouter.get('/getAllEvents', getAllEventsController);
eventRouter.get('/getUpcomingEvents', getUpcomingEventController);
eventRouter.post('/', createEventController);
eventRouter.get('/:eventId', getEventByIdController);
eventRouter.put('/:eventId', updateEventController);
eventRouter.delete('/:eventId', deleteEventController);
