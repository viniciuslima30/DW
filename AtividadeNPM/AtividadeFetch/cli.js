//Deve capturar o que o usuário digita no terminal usando process.argv. O sistema deve aceitar comandos como: node cli.js https://www.exemplo.com.br ou node cli.js ./lista-de-links.md.

import chalk from "chalk";
import { urls } from "./leitor.js";
import validarUrl from "./httpValidacao.js";

const caminho = process.argv;

async function processar(caminho) {
    const pegarUrls = await urls(caminho[2]);

    const resultados = await validarUrl(pegarUrls);


    resultados.forEach(item => {
        console.log(item.url, "-", item.status);
    });
}

processar(caminho);