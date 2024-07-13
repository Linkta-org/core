import { z } from 'zod';

export const userPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase character',
      })
      .regex(/[a-z]/, {
        message: 'Password must contain at least one lowercase character',
      })
      .regex(/[0-9]/, {
        message: 'Password must contain at least one number',
      })
      .regex(/[!@#$%^&*()_\-+={[}\]|:;"'<,>.]/, {
        message: 'Password must contain at least one special character',
      }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Please confirm your password' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type UserPasswordValidation = z.infer<typeof userPasswordSchema>;
export default userPasswordSchema;
