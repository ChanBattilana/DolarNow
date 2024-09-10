const puppeteer = require('puppeteer');

async function obtenerCotizaciones() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    try {
        const url = 'https://dolarapi.com'; // Cambia esta URL por la página que prefieras
        await page.goto(url, { waitUntil: 'load', timeout: 0 });

        const data = await page.evaluate(() => {
            // Aquí se hace el scraping de los datos de cotización
            const dolarOficialCompra = document.querySelector('span[data-test="precio-compra"]').innerText;
            const dolarOficialVenta = document.querySelector('span[data-test="precio-venta"]').innerText;

            return {
                dolarOficialCompra,
                dolarOficialVenta
            };
        });

        await browser.close();
        return data;

    } catch (error) {
        console.error('Error al realizar el scraping:', error);
        await browser.close();
        return null;
    }
}

module.exports = obtenerCotizaciones;
