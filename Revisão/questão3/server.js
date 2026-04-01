import fs from "fs/promises";
import http from "http";

const porta = 3000;

async function lerArquivo(caminhoArquivo) {
    try {
        const data =  await fs.readFile(caminhoArquivo, "utf8");
        return data;
    } catch (error) {
        console.log(error);        
    }
}

const server = http.createServer(async (req, res) => {
    
    if (req.url === "/") {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end("<h1>Portal de APIs Academicas</h1>");
    } else if (req.url === "/instituicao") {
        res.writeHead(200, {"Content-Type": "application/json"});
        const data = await lerArquivo("dados.json");
        res.end(data);
    }   

})

server.listen(porta, () => {
    console.log("Servidor rodando na url http://localhost:3000");
})