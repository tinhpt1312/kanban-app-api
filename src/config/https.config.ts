import * as fs from 'node:fs';
import { ENV } from './env.config';

export const httpsOptions = {
  key: ENV.HTTPS.KEY ? fs.readFileSync(ENV.HTTPS.KEY) : undefined,
  cert: ENV.HTTPS.CERT ? fs.readFileSync(ENV.HTTPS.CERT) : undefined,
};
