const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("./db/conn");
const router = require("./routes/router");
// app.get("/", (req, resp) => {
//   resp.status(201).json("server is created");
// });
// frontend se jo data bhejenge usko backend may store karwayenge iski madad se
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(router);
app.listen(port, () => {
  console.log(`server is running on port no: ${port}`);
});
