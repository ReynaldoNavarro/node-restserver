const express = require('express');
const app = express();
const cors = require('cors');
const { dBConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // Conectar a la base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();
        this.routes();
    }

    async conectarDB() {
        await dBConnection();
    }

    routes () {
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`);
        });
    }

// middlewares: Es una función que se ejecuta antes de que se ejecute cualquier otra función.

    middlewares() {
        //CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio público
        this.app.use(express.static('public'));
    }

}

module.exports = Server;