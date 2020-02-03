import { query as q } from 'faunadb';
import { APIClient, env } from '../../utils';

const updateUser = async user => {
  try {
    const client = APIClient.faunadb();

    console.log('Function `updateUser` invoked');

    const data = {
      data: user,
    };

    const result = await client
      .query(q.Replace(q.Select('ref', q.Get(q.Match(q.Index('users_by_id'), user.id))), data))
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
  } catch {
    console.log('updateUser failed');
    throw new Error('updateUser failed');
  }
};

const login = async user => {
  console.log('Function `login` invoked');

  try {
    const response = await updateUser(user);
    throw new Error('login success.');
    console.log(response);
    return;
  } catch {
    throw new Error('Unable to login user.');
  }
};

export default login;
