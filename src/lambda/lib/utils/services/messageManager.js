import { query as q } from 'faunadb';
import { APIClient, emailParser } from '../../utils';

const saveMessage = async email => {
  try {
    console.log('identity saveMessage invoked');

    const client = APIClient.faunadb();

    const data = {
      data: emailParser(email),
    };

    const result = await client
      .query(q.Create(q.Collection('messages'), data))
      .then(response => {
        console.log('saveMessage success');
        return response;
      })
      .catch(error => {
        console.log('identity saveMessage fail');

        console.log('error', error);
        throw error;
      });

    console.log('identity saveMessage success');
    return result;
  } catch (error) {
    console.log('saveMessage fail error');
    console.log(error.toString());
    throw error;
  }
};

export { saveMessage };
