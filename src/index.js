const express = require('express')
const ServerConfig = require('./config/server_config')
const apiRoutes = require('./routes/index');
const db = require('./models/index')


const startServer = () => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));


    app.use('/api', apiRoutes);

    app.listen(ServerConfig.PORT, () => {
        console.log(`Server started at ${ServerConfig.PORT}`);
        if (process.env.DB_SYNC) {
            db.sequelize.sync({ alter: true })
        }
    })
}

startServer()