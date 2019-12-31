const querystring = require("querystring");

// const crypto = require('crypto')
//
// const verify = ({ apiKey, timestamp, token, signature }) => {
//     const encodedToken = crypto
//         .createHmac('sha256', apiKey)
//         .update(timestamp.concat(token))
//         .digest('hex')
//
//     return (encodedToken === signature)
// }

exports.handler = function(event, context, callback) {
  const email = querystring.parse(event.body);

  // console.log(email);
  console.log(event.body);
  console.log(email.subject);
  console.log(email["message-url"]);

  callback(null, {
    statusCode: 200,
    body: email["message-url"]
  });
};
