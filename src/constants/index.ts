export const ACCESS_TOKEN_COOKIE_NAME = 'ssm-access-token';

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  expires: new Date(Date.now() + 1000 * 2505600), // 29 days
};
