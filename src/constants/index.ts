import { config } from 'dotenv';
import { ENV } from 'src/config';

config();

export const ACCESS_TOKEN_COOKIE_NAME = ENV.COOKIE.ACCESS_TOKEN_NAME;

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  expires: new Date(Date.now() + 1000 * 2505600), // 29 days
};
