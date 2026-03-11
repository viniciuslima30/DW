// Carrega os modulos necessarios:

var http= require('http');
var url = require('url');

// Função callback para o servidor:

var callback = function(request, response) {
    // Define o cabeçalho (Header) com o tipo de resposta:
    
    response.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});

    // Faz o parse da URL (separando o caminho - endpoint / rotas):

    var parts = url.parse(request.url);

    // Verifica a rota (endpoint):

    if (parts.path === "/") {
        response.end("Site principal");
    } else if (parts.path === "/rota1") {
        response.end("Site da rota1");
    } else if (parts.path === "/rota2") {
        response.end("Site da rota2");
    } else {
        response.end("Error 404\n" + "Não encontrado: " + parts.path);
    }


}

// Criar o servidor http:

var server = http.createServer(callback);

// Configuração do servidor:

server.listen(3000);
console.log('Servidor rodando na porta http://localhost:3000');
