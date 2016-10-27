import API from '../API';

const PropertyActions = {
  getStats() {
    API.getStats();
  },

  createClient(client) {
    API.createClient(client);
  },

  createProperty(property) {
    API.createProperty(property);
  },

  deleteClient(client) {
    API.deleteClient(client);
  },

  deleteProperty(prop) {
    API.deleteProperty(prop);
  },

};
export default PropertyActions;
