import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { env, login, signup, validate } from '../../utils';

const isValid = req => {
  try {
    return true;

    const headers = req.headers;
    const token = headers['x-webhook-signature'] || headers['X-Webhook-Signature'];

    jwt.verify(token, env.NETLIFY_IDENTITY_WEBHOOK_SECRET, { issuer: 'gotrue' }, function(
      err,
      decoded,
    ) {
      if (decoded !== undefined) {
        const digest = crypto
          .createHash('sha256')
          .update(req.body.toString())
          .digest('hex');

        const sha = decoded.sha256;

        // return sha === digest ? true : false;
      } else {
        throw new Error('Invalid webhook signature');
      }
    });

    return true;
  } catch (error) {
    console.log(error.toString());
    return false;
  }
};

export default (router, path) => {
  router.post(path, async (req, res) => {
    try {
      if (isValid(req)) {
        const body = req.body;
        const eventType = body.event;
        const user = body.user;

        switch (eventType) {
          case 'login':
            login(user);
            break;
          case 'signup':
            signup(user);
            break;
          case 'validate':
            validate(user);
            break;
        }

        res.status(204).send();
      } else {
        res.status(401).send();
      }
    } catch (error) {
      console.log('identity hook failed');
      console.log(error.toString());
      res.status(400).send(error.error);
    }
  });
};
