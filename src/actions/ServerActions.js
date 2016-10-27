import AppDispatcher from '../AppDispatcher';

const ServerActions = {
  receiveStats(stats) {
    AppDispatcher.dispatch({
      type: 'GET_STATS',
      payload: stats,
    });
  },
};
export default ServerActions;
