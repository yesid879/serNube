const express = require('express');
const conectarBD = require('../config/db');
const cors = require('cors');

// creamos nuestro servidor
const app = express();

const port =  process.env.PORT || 5000;

// enlazamos la conexion con nuestra base de datos

conectarBD();
app.use(cors());
app.use(express.json());

// ruta principal del proyecto
app.use('/api/clientes', require ('../routes/rutas'));


// ruta para verificar el servidor 
app.get('/', (req,res) => {
    res.send('Hola mundo desde la web');
})

app.listen(port,() => {
    console.log('El servidor esta conectado http://localhost:5000/ ');
})


