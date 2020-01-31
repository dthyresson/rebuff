import serverless from 'serverless-http';
import app from './lib/app';
import webhooks from './lib/webhooks';

app.use('/.netlify/functions/webhooks', webhooks);

export const handler = serverless(app);
export default app;
