const express = require("express")
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes")

const app = express();
const socket = require("socket.io");
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("DB Connection Successful");
}).catch((err) => {
  console.log(err.message);
})
123
// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);
const server = app.listen(process.env.PORT, () => {
  console.log(`Server Started onPort ${process.env.PORT}`)
})

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true
  }
})