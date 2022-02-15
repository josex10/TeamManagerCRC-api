const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.database');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.routeUser = '/api/user/';

        //CONECTAR DN
        this.connectarDB();

        //MIDDLEWARES
        this.middlewares();

        //RUTAS DE LA APP
        this.routes();
    }

    async connectarDB(){
        await dbConnection();
    }

    routes(){
        
        this.app.use(this.routeUser, require('../routes/user.routes'));

    }

    middlewares(){
        this.app.use( cors() );
        this.app.use( express.json() );
        this.app.use( express.static('public') );
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`My RESTServer Class is running on port: ${this.port}`);
        });
    }

}

module.exports = Server;