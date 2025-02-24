import { z } from "zod";

const emailSchema = z.string().email({ message: "Invalid email address" });
const nameSchema = z.string().min(1, { message: "Full Name is required" });
const passwordSchema = z
  .string()
  .min(6, { message: "Password must be at least 6 characters long" });

export const individualSignUpSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(6, {
      message: "Confirm Password must be at least 6 characters long",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const organizationSignUpSchema = z
  .object({
    organizationName: z
      .string()
      .min(1, { message: "Organization Name is required" }),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(6, {
      message: "Confirm Password must be at least 6 characters long",
    }),
    address: z.string().min(1, { message: "Address is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const departmentSignUpSchema = z
  .object({
    fullName: nameSchema,
    organizationName: z
      .string()
      .min(1, { message: "Organization Name is required" }),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(6, {
      message: "Confirm Password must be at least 6 characters long",
    }),
    department: z.string().min(1, { message: "Department Name is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
