import { logger } from "../utils";

export default (router, path) => {
  router.get(path, async (req, res) => {
    console.log("sltest");
    logger();

    try {
      console.log("sltest");

      logger();
      logger();
      logger();

      res
        .header("Content-Type", "application/json")
        .status(200)
        .send({ result: "foo" });
    } catch (error) {
      console.log(error.toString());
      res.status(400).send(error.error);
    }
  });
};
