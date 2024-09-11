const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

// Utilizar el puerto que Vercel nos asigna o el 3000 en local
const port = process.env.PORT || 3000;

// Habilitar CORS para permitir que el frontend haga solicitudes
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Servir archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint para obtener las cotizaciones
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

// Redirigir todas las demás rutas a `index.html`
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
