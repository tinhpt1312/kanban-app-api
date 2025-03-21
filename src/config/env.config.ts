import { config } from 'dotenv';

config();

export const ENV = {
  APP_PORT: process.env.APP_PORT ?? 3000,

  DATABASE: {
    HOST: process.env.DB_HOST,
    PORT: Number(process.env.DB_PORT),
    USERNAME: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    DATABASE: process.env.DB_DATABASE,
  },

  COOKIE: {
    ACCES_TOKEN_TIME: process.env.COOKIE_ACCESS_TOKEN_EXPIRATION_TIME,
  },

  HTTPS: {
    ENABLED: process.env.HTTPS_ENABLE === 'true',
    KEY: process.env.HTTPS_KEY_PATH,
    CERT: process.env.HTTPS_CERT_PATH,
    DOMAIN: process.env.HTTPS_LOCAL_DOMAIN ?? 'https://localhost',
  },

  MAIL: {
    USER: process.env.MAIL_USER,
    PASS: process.env.MAIL_PASS,
    HOST: process.env.MAIL_HOST,
    PORT: Number(process.env.MAIL_PORT),
  },

  GOOGLE: {
    CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    CALLBACK_URL: process.env.GOOGLE_CLIENT_CALLBACK_URL,
  },

  JWT: {
    SECRET: process.env.JWT_SECRET,
    EXPIRES_IN_WEB: process.env.JWT_EXPIRES_IN_WEB,
    EXPIRES_IN_CLI: process.env.JWT_EXPIRES_IN_CLI,
    COOKIE_NAME: process.env.JWT_COOKIE_NAME,
  },
};
