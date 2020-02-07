import crypto from 'crypto';
import env from './env';
import jwt from 'jsonwebtoken';

const validateIdentityWebhook = req => {
  try {
    const headers = req.headers;
    const token = headers['x-webhook-signature'] || headers['X-Webhook-Signature'];

    const valid = jwt.verify(
      token,
      env.NETLIFY_IDENTITY_WEBHOOK_SECRET,
      { issuer: 'gotrue' },
      function(err, decoded) {
        if (decoded !== undefined) {
          const digest = crypto
            .createHash('sha256')
            .update(JSON.stringify(req.body))
            .digest('hex');

          const sha = decoded.sha256;

          return sha === digest ? true : false;
        } else {
          throw new Error('Invalid webhook signature');
        }
      },
    );

    return valid;
  } catch (error) {
    console.log(error.toString());
    return false;
  }
};

export default validateIdentityWebhook;
