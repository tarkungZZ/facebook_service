require('dotenv').config()

module.exports = {

    MYSQL_IP: process.env.MYSQL_IP,
    MYSQL_PORT: process.env.MYSQL_PORT,
    MYSQL_USER: process.env.MYSQL_USER,
    MYSQL_PASS: process.env.MYSQL_PASS,
    MYSQL_DB: process.env.MYSQL_DB,
    MANAGER_PORT: process.env.MANAGER_PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRE: process.env.JWT_EXPIRE,
    MD5_SECRET: process.env.MD5_SECRET,

}