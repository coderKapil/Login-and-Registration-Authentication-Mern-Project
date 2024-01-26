const mongoose = require("mongoose");
const DB =
  "mongodb+srv://kapsrana56:xyz123@cluster0.o8vcgdg.mongodb.net/Authusers?retryWrites=true&w=majority";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((errr) => {
    console.log(errr);
  });
