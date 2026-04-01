import http from "http";

const porta = 3001;

const roteador = http.createServer((req, res) => {

    if (req.url === "/fatec") {
        res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Bem vindo à Faculdade de Tecnologia");
    } else if (req.url === "/fecap") {
        res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Bem vindo a FATEC Diadema");
    } else {
        res.writeHead(404, {"Content-Type": "text/plain; charset=utf-8" });
        res.end("Error 404: Recurso não encontrado no servidor");
    }

})

roteador.listen(porta, () => {
    console.log(`Servidor rodando na url http://localhost:${porta}`);
})