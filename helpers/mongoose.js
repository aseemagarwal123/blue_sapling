
const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI ||'mongodb+srv://aseem:aseem123@cluster0.zvjhe.mongodb.net/test?retryWrites=true&w=majority';


// Fixing deprication warnings
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

function connect() {
  return mongoose.connect(MONGO_URI, options)
      .then(() => {
        console.log('Connected to mongodb');
      })
      .catch((err) => {
        console.log('Couldnt connect to mongodb:', err.message);
        process.exit(1);
      });
}

function close() {
  return mongoose.connection.close();
}

module.exports = {
  connect,
  close,
};