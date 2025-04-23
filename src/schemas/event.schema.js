import * as z from 'zod';
import { DateSchema } from './date.schema.js';

export const EventSchema = z.object({
  employeeId: z.string().min(3).max(50),
  occasion: z.string().min(1).max(50),
  paymentType: z.enum(['INSURANCE', 'ANNIVERSARY', 'BIRTHDAY', 'DIWALI']),
  amount: z.number().min(0),
  reminderDate: DateSchema,
  eventDate: DateSchema,
  paymentDate: DateSchema.optional(),
  paymentConfirmed: DateSchema.optional()
});
