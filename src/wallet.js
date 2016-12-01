import mongoose from '../db';

const Schema = mongoose.Schema;

let addressSchema = new Schema({
  address: {type: String, unique: true},
  privateKey: {type: String},
  publicKey: {type: String},
  wif:{type:String}
});

let addressModel = mongoose.model('address', addressSchema);

export default addressModel;
