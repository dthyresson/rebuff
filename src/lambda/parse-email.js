import { logger } from "./lib/utils";

require("dotenv").config({
  path: `.env.${
    process.env.NODE_ENV === "production" ? "production" : "development"
  }`
});

const env = {
  FAUNADB_SERVER_SECRET: process.env.FAUNADB_SERVER_SECRET
};

const faunadb = require("faunadb");
const q = faunadb.query;
const client = new faunadb.Client({
  secret: env.FAUNADB_SERVER_SECRET
});

const addressparser = require("email-addresses");
const DKIMSignature = require("dkim-signature");
const _array = require("lodash/array");
const querystring = require("querystring");

const saveMessage = email => {
  console.log("Function `saveMessage` invoked");

  // todo: the email content should be encrypted
  const doc = {
    data: {
      id: email["Message-Id"],
      recipient: email["recipient"],
      sender: email["sender"],
      subject: email["subject"],
      timestamp: email["timestamp"],
      email: email
    }
  };

  return client
    .query(q.Create(q.Collection("messages"), doc))
    .then(response => {
      console.log("success", response);
      return;
    })
    .catch(error => {
      console.log("error", error);
      return;
    });
};

exports.handler = function(event, context, callback) {
  logger();

  const email = querystring.parse(event.body);
  console.log(email.subject);

  const headers = _array.fromPairs(JSON.parse(email["message-headers"]));
  console.log(headers);

  const messageId = headers["Message-Id"];
  console.log(messageId);

  const dkim = headers["Dkim-Signature"];
  console.log(dkim);

  const signature = DKIMSignature.parse(dkim);
  console.log(signature);

  const from = headers["From"];
  console.log(from);

  const fromEmail = addressparser.parseOneAddress(from);
  console.log(fromEmail);
  console.log(fromEmail.local);
  console.log(fromEmail.domain);

  const to = headers["To"];
  console.log(to);

  const toEmail = addressparser.parseOneAddress(to);
  console.log(toEmail);
  console.log(toEmail.local);
  console.log(toEmail.domain);

  saveMessage(email);

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ result: true })
  });
};
