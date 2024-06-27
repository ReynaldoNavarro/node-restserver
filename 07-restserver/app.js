require ('dotenv').config();

const Server = require('./models/server'); // Se importa la clase Server

const server = new Server();
server.listen(); // Se llama al método listen de la clase Server
