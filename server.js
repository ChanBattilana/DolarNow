const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Habilitar CORS para permitir que el frontend haga solicitudes
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/cotizaciones', async (req, res) => {
    try {
        const response = await axios.get('https://dolarapi.com/v1/dolares');
        const datos = response.data;  // Obtener los datos de la API
        res.json(datos);  // Enviar los datos al frontend
    } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
        res.status(500).send('Error al obtener las cotizaciones.');
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
