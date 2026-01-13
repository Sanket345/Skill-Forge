const mongoose = require("mongoose");

exports.connect = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("DB Connection Is Successful"))
    .catch((error) => {
      console.log("Error in DB Connection");
      console.error(error);
      process.exit(1);
    });
};
