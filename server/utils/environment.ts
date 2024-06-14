import dotenv from 'dotenv';
import { resolve } from 'path';

/**
 * Get environment variables from .env file in the config directory.
 */
export function getEnv(): void {
  const projectRoot = process.cwd();
  const envPath = resolve(projectRoot, 'server', '.env');

  const envConfig = {
    path: envPath,
  };

  dotenv.config(envConfig);
}
