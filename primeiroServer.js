// Carrega os modulos Necessarios:

const http = require('http');

// Criar um servidor http para envio de msg:

var server = http.createServer(function(request, response) {
    // Define o cabeçalho (header) com o tipo de resposta:
    
    response.writeHead(200, {"Content-type": "text/plain"});
    
    // Mensagem de Retorno:
    
    response.end("Oi mundo Node... FATEC 217\n");

})

// Configuração do server:

server.listen(3000);
console.log("Servidor iniciado em http://localhost:3000");
