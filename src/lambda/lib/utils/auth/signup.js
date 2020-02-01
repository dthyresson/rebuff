import addressparser from 'email-addresses';
import { query as q } from 'faunadb';
import { APIClient, env } from '../../utils';

const client = APIClient.faunadb();

const createMailbox = (userRef, user) => {
  const mailboxAddress = addressparser.parseOneAddress(user.email);
  console.log('Function `createMailbox` invoked');

  const data = {
    data: { name: mailboxAddress.local, user: userRef },
  };

  client
    .query(q.Create(q.Collection('mailboxes'), data))
    .then(response => {
      console.log('create mailbox success');
      return;
    })
    .catch(error => {
      console.log('error', error);
      throw error;
    });
};

const createUserAndMailbox = user => {
  const data = {
    data: user,
  };

  return client
    .query(q.Create(q.Collection('users'), data))
    .then(response => {
      console.log('create user success');

      createMailbox(response['ref'], user);

      return;
    })
    .catch(error => {
      console.log('error', error);
      throw error;
    });
};

const signup = user => {
  console.log('Function `signup` invoked', user);

  try {
    createUserAndMailbox(user);
    return;
  } catch {
    throw new Error('Unable to signup user.');
  }
};

export default signup;
