const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.database');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.routeUser = '/api/user/';
        this.routePlayer = '/api/player/';
        this.routeAuth = '/api/auth/';
        this.routePosition = '/api/position';
        this.RouteTeam = '/api/team';

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
        this.app.use(this.routePlayer, require('../routes/TMCRC.player.route'));
        this.app.use(this.routeAuth, require('../routes/TMCRC.auth.route'));
        this.app.use(this.routePosition, require('../routes/TMCRC.position.route'));
        this.app.use(this.RouteTeam, require('../routes/TMCRC.team.route'));
        
    }

    middlewares(){
        this.app.use( cors() );
        this.app.use( express.json() );
        this.app.use( express.static('public') );
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`The TMCRC Server is running on port: ${this.port}`);
        });
    }

}

module.exports = Server;