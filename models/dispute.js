import mongoose from '../db';

const SchemaDispute = mongoose.Schema;

let disputeSchema = new SchemaDispute({
  name: {
    type: String,
    unique: true,
    reqiured: true
  },
  discription: String,
  sides: {
    type: Object
  },
  timer: Date,
  referee: {
    type: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}]
  },
  complete: {
    type: Boolean,
    default: false
  }
});

let disputeModel = mongoose.model('dispute', disputeSchema);

export default disputeModel;
