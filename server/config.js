module.exports = {
  port: process.env.PORT, //express 启动服务的窗口
  /**数据库相关配置*/
  db: {
    host: "localhost", //主机名
    port: 3306,        //端口号
    user: "root",      //使用root登入Mysql
    password: "19981026zj",
    database: ""          //使用数据库
  }
}