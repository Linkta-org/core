import 'dotenv/config';
import {resolve} from 'path';

export function getEnv(): void {
  const envPath = resolve(__dirname, '../../config/.env');
  console.log(envPath);
  require('dotenv').config({path: envPath });
}