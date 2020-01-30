import { logger } from "./lib/utils";

require("dotenv").config();

exports.handler = function(event, context, callback) {
  console.log("test");

  logger();
  logger();
  logger();

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ result: true })
  });
};
