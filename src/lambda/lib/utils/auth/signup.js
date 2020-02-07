import { createUserAndMailbox } from '../../services';

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
