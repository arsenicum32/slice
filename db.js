import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://slice:slice@ds113668.mlab.com:13668/slice');

export default mongoose;
