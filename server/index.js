const express = require("express")
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");

const app = express();
const socket = require("socket.io");
require("dotenv").config();

app.use(cors());
app.use(express.json());

//设置路由
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
//连接mongodb数据库
//mongoose.connect(url, options)
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("DB Connection Successful");
}).catch((err) => {
  console.log(err.message);
})


const server = app.listen(process.env.PORT, () => {
  console.log(`Server Started onPort ${process.env.PORT}`)
})
//配置websocket.io 跨域
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true
  }
})

//收集在线用户
global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  })

  socket.on("send-msg", (data) => {
    console.log(onlineUsers);
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("receiveMsg", data.msg, "this is broad");
    }
  })
})
