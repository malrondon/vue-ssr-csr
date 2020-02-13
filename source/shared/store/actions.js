import services from '../services';

export const getUsers = ({ commit }) => services.getUsers().then(response => commit('setUsers', response.data));
