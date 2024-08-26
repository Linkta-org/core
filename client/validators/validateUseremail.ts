import { z } from 'zod';

const disposableEmailDomains = [
  'mailinator.com',
  'dispostable.com', // is this a typo?
  '10minutemail.com',
];

export const userEmailSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .max(255, { message: 'Email is too long' })
    .refine(
      (email) => {
        const domain = email.split('@')[1];
        return !disposableEmailDomains.includes(domain);
      },
      { message: 'Disposable email addresses are not allowed' },
    ),
});
