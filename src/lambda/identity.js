import { logger } from "./lib/utils";

require("dotenv").config();

const addressparser = require("email-addresses");

const faunadb = require("faunadb");
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
});

const login = user => {
  console.log(user);

  console.log("Function `login` invoked", user);
  const doc = {
    data: user
  };

  return client
    .query(
      q.Replace(
        q.Select("ref", q.Get(q.Match(q.Index("users_by_id"), user.id))),
        doc
      )
    )
    .then(response => {
      console.log("success", response);
      return;
    })
    .catch(error => {
      console.log("error", error);
      throw error;
    });
};

const createMailbox = (userRef, user) => {
  const mailboxAddress = addressparser.parseOneAddress(user.email);
  console.log(mailboxAddress);
  console.log(mailboxAddress.local);
  console.log(mailboxAddress.domain);

  console.log("Function `createMailbox` invoked", mailboxAddress);
  const doc = {
    data: { name: mailboxAddress.local, user: userRef }
  };

  return client
    .query(q.Create(q.Collection("mailboxes"), doc))
    .then(response => {
      console.log("success", response);
      return;
    })
    .catch(error => {
      console.log("error", error);
      throw error;
    });
};

const signup = user => {
  console.log(user);

  console.log("Function `signup` invoked", user);
  const doc = {
    data: user
  };

  return client
    .query(q.Create(q.Collection("users"), doc))
    .then(response => {
      console.log("success", response);

      createMailbox(response["ref"], user);

      return;
    })
    .catch(error => {
      console.log("error", error);
      throw error;
    });
};

const validate = user => {
  console.log(user);
  // could use Mailgun email validation to see if a deliverable address
  // https://documentation.mailgun.com/en/latest/api-email-validation.html#email-validation
  return;
};

exports.handler = function(event, context, callback) {
  console.log("identity");

  logger();
  logger();
  logger();

  console.log(event);
  console.log(context);

  const payload = JSON.parse(event.body);

  const eventType = payload.event;

  console.log(eventType);

  const user = payload.user;

  switch (eventType) {
    case "login":
      login(user);
      break;
    case "signup":
      signup(user);
      break;
    case "validate":
      validate(user);
      break;
  }

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ result: true })
  });
};
