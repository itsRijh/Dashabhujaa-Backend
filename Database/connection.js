const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL);

mongoose.connection.once('open', () => true).on('error', () => false);