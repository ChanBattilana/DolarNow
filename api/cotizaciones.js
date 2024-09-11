// api/cotizaciones.js

export default async function handler(req, res) {
    const url = 'https://dolarapi.com/v1/dolares'; // Cambia esta URL si es necesario
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
}
