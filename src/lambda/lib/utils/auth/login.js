import { query as q } from 'faunadb';
import { APIClient, env } from '../../utils';

const updateUser = user => {
  const client = APIClient.faunadb();

  console.log('Function `updateUser` invoked');

  const data = {
    data: user,
  };

  client
    .query(q.Replace(q.Select('ref', q.Get(q.Match(q.Index('users_by_id'), user.id))), data))
    .then(response => {
      console.log('update user success');
      return;
    })
    .catch(error => {
      console.log('error', error);
      throw error;
    });
};

const login = user => {
  console.log('Function `login` invoked');

  try {
    updateUser(user);
    return;
  } catch {
    throw new Error('Unable to login user.');
  }
};

export default login;
