import { z } from 'zod';

const userSignUpSchema = z
  .object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(1, { message: 'Please enter a password' }),
    name: z.string().min(1, { message: 'Please enter your name' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Please enter confirm password' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type FormData = z.infer<typeof userSignUpSchema>;
export default userSignUpSchema;
