const http = require('http');
const https = require('https');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        // Consumir el API del perrito
        https.get('https://dog.ceo/api/breeds/image/random', (apiRes) => {
            let data = '';

            apiRes.on('data', chunk => data += chunk);

            apiRes.on('end', () => {
                const resultado = JSON.parse(data);
                const imagenURL = resultado.message;

                // Responder con HTML que contiene la imagen
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(`
                    <html>
                        <head><title>Perrito Aleatorio</title></head>
                        <body>
                            <h1> POV esteban: </h1>
                            <img src="${imagenURL}" alt="Un perrito aleatorio" width="500"/>
                        </body>
                    </html>
                `);
            });

        }).on('error', err => {
            console.error(err.message);
            res.writeHead(500);
            res.end('Error al consumir el API');
        });
    } else {
        res.writeHead(404);
        res.end('Ruta no encontrada');
    }
});

server.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
