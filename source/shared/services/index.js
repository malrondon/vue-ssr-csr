import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/', // should be set based on env
});

const getUsers = () => instance.get('/users');

export default {
  getUsers,
};
