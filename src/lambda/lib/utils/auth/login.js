import { query as q } from 'faunadb';
import { APIClient, env } from '../../utils';

const client = APIClient.faunadb();

const updateUser = user => {
  try {
    console.log('Function `updateUser` invoked');

    const data = {
      data: user,
    };

    console.log(user.id);

    console.log(data);

    const result = client
      .query(q.Replace(q.Select('ref', q.Get(q.Match(q.Index('users_by_id'), user.id))), data), {})
      .then(response => {
        console.log('update user success');
        console.log(response);

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

const login = async user => {
  console.log('Function `login` invoked');

  try {
    const response = updateUser(user);
    console.log('login success.');
    console.log(response);
    return response;
  } catch {
    throw new Error('Unable to login user.');
  }
};

export default login;
