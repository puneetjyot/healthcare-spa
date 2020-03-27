var mongoose = require('mongoose');

mongoose.connect(
    "mongodb+srv://puneetjyot:handshake@handshake-mongo-zu6wh.mongodb.net/Handshake?retryWrites=true&w=majority",
    {
      useNewUrlParser: true
    }
  );
module.exports = {
  mongoose
};
