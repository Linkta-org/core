import { z } from 'zod';

const disposableEmailDomains = [
  'mailinator.com',
  'dispostable.com', // is this a typo?
  '10minutemail.com',
];

// Schema for email validation
export const userEmailSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .max(255, 'Email is too long')
    .refine((email) => {
      const domain = email.split('@')[1];
      return !disposableEmailDomains.includes(domain);
    }, 'Disposable email addresses are not allowed'),
});

// Schema for password validation
const passwordSchema = z
  .string()
  .min(6, 'Password must be at least 6 characters long')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(
    /[!@#$%^&*()_\-+={[}\]|:;"'<,>.]/,
    'Password must contain at least one special character',
  );

// Schema for combined password and confirmation
export const userPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// Combined schema for authentication (email + password)
export const userCredentialsSchema = z
  .object({
    email: userEmailSchema.shape.email,
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
