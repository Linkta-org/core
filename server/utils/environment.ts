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
