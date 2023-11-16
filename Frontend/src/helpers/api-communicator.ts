// Defines some function to work with the Back End API
import axios from 'axios';

export const loginUser = async (email: string, password: string) => {
  const res = await axios.post('/user/login', { email, password });
  if (res.status !== 200) {
    throw new Error('Unable to login');
  }
  // This code is only executed when the previous check was successful
  return res.data;
};
