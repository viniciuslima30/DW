var http = require('http');
var url = require('url');
var fs = require('fs');

function readFile(response, file) {
    fs.readFile(file, function (err, data) {

        if (err) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.end("Erro ao ler arquivo");
            console.log(err);
            return;
        }

        response.end(data);
    });
}

var server = http.createServer(function(request, response) {

    var path = url.parse(request.url).pathname;

    console.log("Rota acessada:", path);

    if (path === "/rota1/cadastro") {
        response.writeHead(200, {"Content-Type": "application/json"});
        readFile(response, "cadastro.json");

    } else {
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.end("404 - Rota não encontrada");
    }

});

server.listen(3000);
console.log("Servidor rodando em http://localhost:3000");
