const express = require('express');
const axios = require('axios');
const app = express();
const url = "https://tusitio.vercel.app/cotizaciones";  // Ruta completa


const port = process.env.PORT || 3000;  // Asegúrate de utilizar el puerto asignado por Vercel

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
    console.log(`Servidor escuchando en el puerto ${port}`);
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
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
res.header('Access-Control-Allow-Methods', 'GET, POST');
