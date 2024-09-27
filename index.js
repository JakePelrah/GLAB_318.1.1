const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    console.log(req.url)
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.write('<h1 style="color: red">Hello World!</h1>');
    res.write('<p>I wonder what else we can send...</p>');
    res.write('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">')
    res.write(`<a href=videos>Get Videos</a>
        <a href=images>Get Images</a>
        `);

    switch (req.url) {
        case '/videos':
            res.write(`
                <div class='mt-5 d-flex flex-column align-items-center gap-5'><iframe width="560" height="315" src="https://www.youtube.com/embed/cM98Vencdwo?si=30Uw2UvXbKtFdTB1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              <iframe width="560" height="315" src="https://www.youtube.com/embed/LkIlrNAGXQM?si=tr72usu2EQEA0Lyo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div>
              `);
            break
        case '/images':
            res.write(`
                    <div class='mt-5 d-flex flex-column align-items-center gap-5'>
                  </div>
                  `);
            break
    }

    res.end()
});



//2 more rutes

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});