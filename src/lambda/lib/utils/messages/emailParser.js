import DKIMSignature from 'dkim-signature';
import addressparser from 'email-addresses';
import _a from 'lodash/array';
import _o from 'lodash/object';

export default email => {
  try {
    const headers = _a.fromPairs(JSON.parse(email['message-headers']));
    const signature = DKIMSignature.parse(headers['Dkim-Signature']);
    const from = addressparser.parseOneAddress(headers['From']);
    const to = addressparser.parseOneAddress(headers['To']);
    const addressFields = ['type', 'name', 'local', 'domain'];
    const timestamp = parseInt(email['timestamp']);

    const data = {
      id: email['Message-Id'],
      recipient: email['recipient'],
      sender: email['sender'],
      subject: email['subject'],
      from: _o.pick(from, addressFields),
      to: _o.pick(to, addressFields),
      timestamp: timestamp,
      receivedAt: new Date(timestamp * 1000).toISOString(),
      dkim: {
        domain: signature.domain,
        expires: signature.expires,
        identity: signature.identity,
      },
      email: email,
    };

    return data;
  } catch (error) {
    console.log(error.toString());
    throw new Error('Unable to parse email.');
  }
};
