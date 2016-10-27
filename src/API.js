import axios from 'axios';
import ServerActions from './actions/ServerActions';

const API = {
  getStats() {
    axios.all([
      axios.get('/api/properties'),
      axios.get('/api/persons'),
    ])
    .then(axios.spread((props, persons) => {
      const unit = {
        clients: persons.data,
        properties: props.data,
      };
      ServerActions.receiveStats(unit);
    }))
    .catch((err) => {
      console.log('err', err);
    });
  },

  createClient(client) {
    axios.post('/api/persons', client);
    API.getStats();
  },

  createProperty(property) {
    axios.post('/api/properties', property);
    API.getStats();
  },

  deleteClient(client) {
    axios.delete(`/api/persons/${client}`);
    API.getStats();
  },

  deleteProperty(prop) {
    axios.delete(`/api/persons/${prop}`);
    API.getStats();
  },

  editClient(client) {
    console.log("client", client.id)
    axios.put(`/api/persons/${client.id}`, client);
    API.getStats();
  },
  editProperty(prop) {
    axios.put(`/api/properties/${prop.id}`);
    API.getStats();
  },
};

export default API;
