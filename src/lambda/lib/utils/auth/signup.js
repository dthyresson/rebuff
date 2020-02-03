import addressparser from 'email-addresses';
import { query as q } from 'faunadb';
import { APIClient, env } from '../../utils';

const createMailbox = async (userRef, user) => {
  try {
    const mailboxAddress = addressparser.parseOneAddress(user.email);
    console.log('Function `createMailbox` invoked');

    const client = APIClient.faunadb();

    const data = {
      data: { name: mailboxAddress.local, user: userRef },
    };

    client
      .query(q.Create(q.Collection('mailboxes'), data))
      .then(response => {
        console.log('create mailbox success');
      })
      .catch(error => {
        console.log('error', error);
        throw error;
      });

    return;
  } catch (error) {
    console.log('createMailbox fail error');
    console.log(error.toString());
    throw error;
  }
};

const createUserAndMailbox = async user => {
  try {
    const client = APIClient.faunadb();

    const data = {
      data: user,
    };

    client
      .query(q.Create(q.Collection('users'), data))
      .then(response => {
        console.log('create user success');

        createMailbox(response['ref'], user);
      })
      .catch(error => {
        console.log('identity user fail');

        console.log('error', error);
        throw error;
      });

    console.log('identity createUserAndMailbox success');
    return;
  } catch (error) {
    console.log('createUserAndMailbox fail error');
    console.log(error.toString());
    throw error;
  }
};

const signup = async user => {
  console.log('Function `signup` invoked');

  try {
    createUserAndMailbox(user);
    return;
  } catch {
    console.log('Unable to signup user.');
    throw new Error('Unable to signup user.');
  }
};

export default signup;
