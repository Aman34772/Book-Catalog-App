const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false); // for handling mongodb error

// MongoDB connect
mongoose
  .connect(`mongodb+srv://ak0350548:VxJlyDDuADyMzcd6@cluster0.0ur512q.mongodb.net/`)
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((err) => {
    "Database Connection Failed: " + err;
  });
