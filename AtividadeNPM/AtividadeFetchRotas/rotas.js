import http from "http";
import fs from "fs/promises";

const config = JSON.parse(await fs.readFile('./conf.json', 'utf-8'));
const { porta, arquivo, logFile } = config;

async function validarConfiguracao(caminho) {
    try {
        await fs.access(caminho);
        return { arquivo: caminho, status: "OK" };
    } catch (err) {
        return { arquivo: caminho, status: "ERRO" };
    }
}

async function lerArquivo(caminho) {
    try {
        const dados = await fs.readFile(caminho, "utf-8");
        return JSON.parse(dados);
    } catch (err) {
        return { erro: "Erro ao ler arquivo" };
    }
}

const server = http.createServer(async (req, res) => {

    if (req.url === '/estoque') {
        res.writeHead(200, { "Content-Type": "application/json" });
        const estoque = await lerArquivo('./estoque.json');
        res.end(JSON.stringify(estoque));

    } else if (req.url === '/adm') {
        res.writeHead(200, { "Content-Type": "application/json" });

        const resultados = await Promise.all([
            validarConfiguracao('./cli.js'),
            validarConfiguracao('./conf.json'),
            validarConfiguracao('./estoque.json'),
            validarConfiguracao('./httpValidacao.js'),
            validarConfiguracao('./leitor.js'),
            validarConfiguracao('./rotas.js')
        ]);

        res.end(JSON.stringify(resultados, null, 2));

    } else if (req.url === '/log') {
        res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });

        try {
            const log = await fs.readFile(logFile, 'utf-8');
            res.end(log);
        } catch (err) {
            res.end(`Erro ao ler o arquivo de log: ${logFile}`);
        }

    } else {
        res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
        res.end("Página Inicial!");
    }
});

server.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta} (config: ${JSON.stringify({porta, logFile, arquivo})})`);
});
