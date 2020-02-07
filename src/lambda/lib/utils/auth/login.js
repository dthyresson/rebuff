import { updateUser } from '../../services';

const login = async user => {
  console.log('Function `login` invoked');

  try {
    const response = await updateUser(user);
    console.log('login success.');
    return response;
  } catch {
    throw new Error('Unable to login user.');
  }
};

export default login;
