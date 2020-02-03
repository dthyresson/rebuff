import addressparser from 'email-addresses';
import { query as q } from 'faunadb';
import { APIClient } from '../../utils';

const client = APIClient.faunadb();

const createMailbox = async (userRef, user) => {
  try {
    const mailboxAddress = addressparser.parseOneAddress(user.email);
    console.log('Function `createMailbox` invoked');

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

const createUser = async user => {
  try {
    console.log('identity createUserAndMailbox invoked');

    const data = {
      data: user,
    };

    const result = await client
      .query(q.Create(q.Collection('users'), data))
      .then(response => {
        console.log('create user success');
        return response;
      })
      .catch(error => {
        console.log('identity user fail');

        console.log('error', error);
        throw error;
      });

    console.log('identity createUserAndMailbox success');
    return result;
  } catch (error) {
    console.log('createUserAndMailbox fail error');
    console.log(error.toString());
    throw error;
  }
};

const createUserAndMailbox = async user => {
  try {
    const response = await createUser(user);
    console.log(response);

    const mailboxResponse = await createMailbox(response['ref'], user);
    console.log(mailboxResponse);

    return mailboxResponse;
  } catch (error) {
    console.log('Unable to createUserAndMailbox.');
    console.log(error);
    throw new Error('Unable to createUserAndMailbox.');
  }
};

const signup = async user => {
  console.log('Function `signup` invoked');

  try {
    const response = await createUserAndMailbox(user);
    return response;
  } catch (error) {
    console.log('Unable to signup user.');
    console.log(error);
    throw new Error('Unable to signup user.');
  }
};

export default signup;
