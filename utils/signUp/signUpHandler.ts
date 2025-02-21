import { z } from 'zod';

export const handleSignUp = async (schema: z.ZodSchema, data: any) => {
  const result = schema.safeParse(data);
  if (!result.success) {
    const fieldErrors: { [key: string]: string } = {};
    result.error.errors.forEach((error) => {
      if (error.path.length > 0) {
        fieldErrors[error.path[0]] = error.message;
      }
    });
    return { success: false, errors: fieldErrors };
  } else {
    return { success: true, data };
  }
};