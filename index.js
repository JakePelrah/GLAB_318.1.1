const http = require('http');
const fs = require('fs/promises')
const hostname = '127.0.0.1';
const port = 3000;


async function getImageData(path) {
    const imgData = await fs.readFile(__dirname + path)
    return imgData
}
function imageDataToBase64(imgData) {
    return Buffer(imgData).toString('base64')
}

const server = http.createServer((req, res) => {

    switch (req.url) {
        case '/':
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.write('<h1 style="color: red">Hello World!</h1>');
            res.write('<p>I wonder what else we can send...</p>');
            res.write('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">')
            res.write(`<a href=videos>Get Videos</a>
            <a href=images>Get Images</a>
            `);
            res.end()

            break
        case '/videos':
            res.writeHead(200, { 'Content-Type': 'text/plain' })
            res.write(`
                <div class='mt-5 d-flex flex-column align-items-center gap-5'><iframe width="560" height="315" src="https://www.youtube.com/embed/cM98Vencdwo?si=30Uw2UvXbKtFdTB1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              <iframe width="560" height="315" src="https://www.youtube.com/embed/LkIlrNAGXQM?si=tr72usu2EQEA0Lyo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div>
              `);
            res.end()
            break

        case '/images':
            res.writeHead(200, { 'Content-Type': 'text/html' })
            Promise.all([getImageData('/images/1.jpg'),
            getImageData('/images/2.jpg'),
            getImageData('/images/3.jpg'),
            getImageData('/images/4.jpg')]).then((values) => {
                values.forEach(imgData => {
                    imgData = imageDataToBase64(imgData)
                    res.write(`<img src="data:image/jpg;base64, ${imgData}"/>`)
                })
                res.end()
            });
            break
    }
});


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});



