
import { z } from 'zod';

export const createBookingSchema = z.object({
  facility: z.string().length(24, "Invalid facility ID"), // MongoDB ObjectId validation
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, 'Start time must be in HH:mm format'),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, 'End time must be in HH:mm format'),
  payableAmount: z.number().min(0, 'Payable amount must be greater than or equal to 0'),
});


export const  createBookingSchemaFile = {
  createBookingSchema
}