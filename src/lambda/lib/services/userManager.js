import { createMailbox } from './mailboxManager';

import { query as q } from 'faunadb';
import { APIClient } from '../utils';

const createUser = async user => {
  try {
    console.log('identity createUser invoked');

    const client = APIClient.faunadb();

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

    console.log('identity createUser success');
    return result;
  } catch (error) {
    console.log('createUser fail error');
    console.log(error.toString());
    throw error;
  }
};

const createUserAndMailbox = async user => {
  try {
    console.log('identity createUserAndMailbox invoked');

    const response = await createUser(user);
    const mailboxResponse = await createMailbox(response['ref'], user);

    return mailboxResponse;
  } catch (error) {
    console.log('Unable to createUserAndMailbox.');
    console.log(error);
    throw new Error('Unable to createUserAndMailbox.');
  }
};

const updateUser = async user => {
  try {
    console.log('Function `updateUser` invoked');

    const client = APIClient.faunadb();

    const data = {
      data: user,
    };

    const result = await client
      .query(q.Replace(q.Select('ref', q.Get(q.Match(q.Index('users_by_id'), user.id))), data), {})
      .then(response => {
        console.log('update user success');
        return response;
      })
      .catch(error => {
        console.log('update user fail');
        console.log('error', error);
        throw error;
      });

    return result;
  } catch (error) {
    console.log('updateUser failed');
    console.log('error', error);

    throw new Error('updateUser failed');
  }
};

export { createUser, createUserAndMailbox, updateUser };
