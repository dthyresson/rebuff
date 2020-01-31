import { emailParser, env } from '../../utils';

//
// saveMessage(email);

export default (router, path) => {
  router.post(path, async (req, res) => {
    try {
      const email = req.body;
      const message = emailParser(email);

      console.log(message);

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
