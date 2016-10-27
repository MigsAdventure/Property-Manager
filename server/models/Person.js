const mongoose = require('mongoose');

let Person;
const Schema = mongoose.Schema;
const personSchema = new Schema({
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  image: { type: String },
  address: [{ type: Schema.Types.ObjectId, ref: 'Property' }],

});

Person = mongoose.model('Person', personSchema);

module.exports = Person;
