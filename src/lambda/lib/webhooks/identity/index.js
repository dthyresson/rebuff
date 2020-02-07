import { validateIdentityWebhook, login, signup, validate } from '../../utils';

export default (router, path) => {
  router.post(path, async (req, res) => {
    try {
      if (validateIdentityWebhook(req)) {
        const body = req.body;
        const eventType = body.event;
        const user = body.user;

        switch (eventType) {
          case 'login':
            const loginResult = await login(user);
            console.log('identity hook login success');
            break;
          case 'signup':
            const sigupResult = await signup(user);
            console.log('identity hook signup success');
            break;
          case 'validate':
            const validateResult = await validate(user);
            console.log('identity hook validate success');
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
