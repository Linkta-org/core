import dotenv from 'dotenv';
import { resolve } from 'path';

/**
 * Get environment variables from .env file in the server root directory.
 */
export function getEnv(): void {
  const projectRoot = process.cwd();
  const envPath = resolve(projectRoot, '.env');

  const envConfig = {
    path: envPath,
  };

  dotenv.config(envConfig);
}

/**
 * Get environment variables from .env.service-account file in the server root directory.
 */
export function getServiceAccountEnv(): void {
  const projectRoot = process.cwd();
  const envPath = resolve(projectRoot, '.env.service-account');

  const envServiceAccountConfig = {
    path: envPath,
  };

  dotenv.config(envServiceAccountConfig);
}
