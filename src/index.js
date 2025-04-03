const express = require('express')
const app = express();
const ServerConfig = require('./config/server_config')
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.listen(ServerConfig.PORT, () => {
    console.log(`Server started at ${ServerConfig.PORT}`);
})