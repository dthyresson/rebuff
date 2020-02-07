import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { env, login, signup, validate } from '../../utils';

const isValid = req => {
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

export default (router, path) => {
  router.post(path, async (req, res) => {
    try {
      if (isValid(req)) {
        const body = req.body;
        const eventType = body.event;
        const user = body.user;

        switch (eventType) {
          case 'login':
            const loginResult = await login(user);
            console.log('identity hook login success');
            console.log(loginResult);
            break;
          case 'signup':
            const sigupResult = await signup(user);
            console.log('identity hook signup success');
            console.log(sigupResult);

            break;
          case 'validate':
            const validateResult = await validate(user);
            console.log('identity hook validate success');
            console.log(validateResult);
            break;
        }
        console.log('identity hook success');
        res.status(204).send();
      } else {
        console.log('identity hook unauthorized');
        res.status(401).send();
      }
    } catch (error) {
      console.log('identity hook failed');
      console.log(error.toString());
      res.status(400).send(error.error);
    }
  });
};
