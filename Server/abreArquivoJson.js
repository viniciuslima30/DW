// Carrega os módulos
const http = require('http');
const url = require('url');
const fs = require('fs');

// Função para abrir arquivo
function readFile(response, file, type) {
    fs.readFile(file, function (err, data) {
        if (err) {
            response.writeHead(500, {"Content-Type": "text/plain; charset=utf-8"});
            response.end("Erro ao ler arquivo");
            console.log(err);
            return;
        }

        response.writeHead(200, {"Content-Type": type});
        response.end(data);
    });
}

// Callback
const callback = function(request, response) {

    const parts = url.parse(request.url);

    if (parts.pathname === "/pdf") {

        readFile(response, "arquivo.pdf", "application/pdf");

    } else if (parts.pathname === "/jpeg") {

        readFile(response, "arquivo.jpeg", "image/jpeg");

    } else if (parts.pathname === "/json") {

        readFile(response, "dados.json", "application/json");

    } else if (parts.pathname === "/html") {

        readFile(response, "arquivo.html", "text/html; charset=utf-8");

    } else {

        response.writeHead(404, {"Content-Type": "text/plain; charset=utf-8"});
        response.end("Erro 404\nNão encontrado " + parts.pathname);

    }
}

// Criar servidor HTTP
const server = http.createServer(callback);

// Configuração
server.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
