// Carrega os modulos necessarios:

const http = require('http');

// Função callback para o servidor http:

var callback = function (request, response) {

    // Define o cabeçalho (header) com o tipo de resposta:

    response.writeHead(200, {"Content-Type": "text/plain"})

    // Mensagem de retorno:

    response.end("Fatec - Agora na chamada Callback\n");
}

// Cria o servido http:

var server = http.createServer(callback);

// Configura o servidor:

server.listen(3000);
console.log('Servidor rodando na porta http://localhost:3000');
