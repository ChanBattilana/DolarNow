const puppeteer = require('puppeteer');

async function obtenerCotizaciones() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        const url = 'https://dolarapi.com'; // Cambia esta URL por la página que prefieras
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 }); // Ajusta el timeout si es necesario

        // Espera a que los elementos estén presentes en la página
        await page.waitForSelector('span[data-test="precio-compra"]');
        await page.waitForSelector('span[data-test="precio-venta"]');

        const data = await page.evaluate(() => {
            const dolarOficialCompra = document.querySelector('span[data-test="precio-compra"]')?.innerText || 'No disponible';
            const dolarOficialVenta = document.querySelector('span[data-test="precio-venta"]')?.innerText || 'No disponible';

            return {
                dolarOficialCompra,
                dolarOficialVenta
            };
        });

        return data;

    } catch (error) {
        console.error('Error al realizar el scraping:', error);
        return null;
    } finally {
        await browser.close();
    }
}

module.exports = obtenerCotizaciones;
