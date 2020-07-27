const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((self) => {
    console.log(`Connection to ${self.connection.name} established. Backend running on http://localhost:${process.env.PORT}`);
  })
  .catch((error) => {
    console.log(`An error occured try to connect to the DB ${error}`);
  });
