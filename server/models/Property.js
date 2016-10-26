const mongoose = require('mongoose');

let Property;
const Schema = mongoose.Schema;

const propertySchema = new Schema({
  address: { type: String },
  image: { type: String },
  phone: { type: String },
  rent: { type: String },
  clients: [{ type: Schema.Types.ObjectId, ref: 'Person', max: 5 }],
});

Property = mongoose.model('Property', propertySchema);

module.exports = Property;
