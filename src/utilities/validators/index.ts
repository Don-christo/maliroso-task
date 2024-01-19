import z from "zod";
import { passwordUtils } from "../helpers";

export const registerSchema = z.object({
  firstName: z.string().min(2, "firstname is required"),
  lastName: z.string().min(2, "lastname is required"),
  email: z.string().email({ message: "email is invalid" }),
  phone: z.string().min(11, "phone number is required"),
  password: z.string().min(5, passwordUtils.error),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const createProductSchema = z.object({
  name: z.string(),
});

export const createOrderSchema = z.object({
  product: z.string(),
  quantity: z.number(),
});
