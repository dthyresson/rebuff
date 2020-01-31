import faunadb from 'faunadb';
import env from './env';

class APIClient {
  /**
   * Creates a FaunaDB client for interacting mailboxes and messages.
   *
   * @returns the FaunaDB client
   */
  static faunadb() {
    return new faunadb.Client({
      secret: env.FAUNADB_SERVER_SECRET,
    });
  }
}

export default APIClient;
