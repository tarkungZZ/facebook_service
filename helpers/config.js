require('dotenv').config()

module.exports = {

    MYSQL_IP: process.env.MYSQL_IP,
    MYSQL_PORT: process.env.MYSQL_PORT,
    MYSQL_USER: process.env.MYSQL_USER,
    MYSQL_PASS: process.env.MYSQL_PASS,
    MYSQL_DB: process.env.MYSQL_DB,
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRE: process.env.JWT_EXPIRE,
    SOCKET_IP: process.env.SOCKET_IP,
    SOCKET_PORT: process.env.SOCKET_PORT

}