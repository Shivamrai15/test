import * as z from "zod";
export const DateSchema = z.string().refine((value)=>{
    const date = new Date(value);
    return !isNaN(date.getTime());
});