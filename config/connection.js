const mongoose = require("mongoose");
const connection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://rohit5233:QVlKq30iU8ti2nvC@cluster0.sdbosfl.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};
module.exports = connection;
