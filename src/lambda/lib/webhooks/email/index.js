import { saveMessage } from '../../services/messageManager';

export default (router, path) => {
  router.post(path, async (req, res) => {
    try {
      const email = req.body;
      const message = await saveMessage(email);

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
