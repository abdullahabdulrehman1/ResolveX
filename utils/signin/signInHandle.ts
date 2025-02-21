import { signInSchema } from "@/schema/validationSchema";


export const handleSignIn = (email: string, password: string, setErrors: (errors: { email?: string; password?: string }) => void) => {
  const result = signInSchema.safeParse({ email, password });
  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;
    setErrors({
      email: fieldErrors.email?.[0],
      password: fieldErrors.password?.[0],
    });
  } else {
    // Handle sign-in logic here
    console.log('Sign In', { email, password });
  }
};