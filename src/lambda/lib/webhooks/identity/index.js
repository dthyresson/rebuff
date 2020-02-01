import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { login, signup, validate } from '../../utils';

const isValid = req => {
  try {
    return true;

    const headers = req.headers;
    const token = headers['x-webhook-signature'] || headers['X-Webhook-Signature'];

    console.log(req.body);

    console.log(headers);
    console.log(token);

    const decoded = jwt.verify(token, 'boo', { issuer: 'gotrue' });

    console.log(decoded);

    const digest = crypto
      .createHash('sha256')
      .update(req.body.toString())
      .digest('hex');

    console.log(digest);

    const sha = decoded.sha256;

    console.log(sha);

    // return sha === digest ? true : false;

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
      console.log(error.toString());
      res.status(400).send(error.error);
    }
  });
};
