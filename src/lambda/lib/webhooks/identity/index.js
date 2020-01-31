import { login, signup, validate } from '../../utils';

export default (router, path) => {
  router.post(path, async (req, res) => {
    try {
      const body = req.body;
      const eventType = body.event;
      const user = body.user;

      switch (eventType) {
        case 'login':
          console.log(eventType);
          console.log(user);
          login(user);
          break;
        case 'signup':
          console.log(eventType);
          console.log(user);
          signup(user);
          break;
        case 'validate':
          console.log(eventType);
          console.log(user);
          validate(user);
          break;
      }

      res
        .header('Content-Type', 'application/json')
        .status(204)
        .send();
    } catch (error) {
      console.log(error.toString());
      res.status(400).send(error.error);
    }
  });
};
