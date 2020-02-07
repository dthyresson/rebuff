import addressparser from 'email-addresses';
import { query as q } from 'faunadb';
import { APIClient } from '../../utils';

const createMailbox = async (userRef, user) => {
  try {
    console.log('Function `createMailbox` invoked');

    const client = APIClient.faunadb();

    const mailboxAddress = addressparser.parseOneAddress(user.email);

    const data = {
      data: { name: mailboxAddress.local, user: userRef },
    };

    const result = await client
      .query(q.Create(q.Collection('mailboxes'), data))
      .then(response => {
        console.log('create mailbox success');
        return response;
      })
      .catch(error => {
        console.log('error', error);
        throw error;
      });

    return result;
  } catch (error) {
    console.log('createMailbox fail error');
    console.log(error.toString());
    throw error;
  }
};

export { createMailbox };
