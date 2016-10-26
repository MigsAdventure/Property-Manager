import axios from 'axios';
import ServerActions from './actions/ServerActions';

const API = {
  getStats() {
    axios.all([
      axios.get('/api/properties'),
      axios.get('/api/persons')
    ])
    .then(axios.spread((props, persons) => {
      let unit = {
        clients: persons.data,
        properties: props.data
      }
      console.log('properties: ', unit);
    }))
    .catch((err) => {
      console.log('err', err);
    });
  },
};

export default API;
