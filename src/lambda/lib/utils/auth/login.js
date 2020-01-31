import { query as q } from 'faunadb';
import { APIClient, env } from '../../utils';

const client = APIClient.faunadb();

const updateUser = user => {
  console.log('Function `updateUser` invoked');

  const data = {
    data: user,
  };

  return client
    .query(q.Replace(q.Select('ref', q.Get(q.Match(q.Index('users_by_id'), user.id))), data))
    .then(response => {
      console.log('update user success', response);
      return;
    })
    .catch(error => {
      console.log('error', error);
      throw error;
    });
};

const login = user => {
  console.log('Function `login` invoked', user);

  try {
    updateUser(user);
    return;
  } catch {
    throw new Error('Unable to login user.');
  }
};

export default login;
