import * as z from 'zod';

export const QuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).default(1),
  order: z.enum(['asc', 'desc']).default('asc')
});
