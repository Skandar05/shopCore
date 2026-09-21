const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./routes/PRoute.js");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", userRoute);


const mongo_url = process.env.MONGO_URL;
mongoose.set('strictQuery', true);
mongoose
.connect(mongo_url)
.then(() => console.log("MongoDB connected..."))
.catch((err) => console.log(err));

const PORT = process.env.PORT ;

app.listen(PORT, () => {
  console.log(`auth service running on port ${PORT}`);
});
