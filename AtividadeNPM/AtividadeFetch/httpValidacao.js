// Deve receber a lista de URLs e fazer as requisições utilizando node-fetch. Deve capturar o status code de cada requisição.

/*
200: "Site no ar e operante!" (Texto em verde)
400 / 404: "Página não encontrada." (Texto em vermelho)
500: "Erro interno no servidor do site." (Texto em amarelo)
Erros de Conexão/DNS: " Domínio inexistente ou erro de rede." (Texto em vermelho)
*/

import chalk from "chalk";
import fetch from "node-fetch";
import {urls} from "./leitor.js"

async function validarUrl(urls) {
    const arrayStatus = await Promise.all(
        urls.map(async (url) => {
            try {
                const response = await fetch(url);
                const status = response.status;

                let mensagem;

                switch (status) {
                    case 200:
                        mensagem = chalk.green("Site no ar e operante!");
                        break;
                    case 400:
                    case 404:
                        mensagem = chalk.red("Página não encontrada.");
                        break;
                    case 500:
                        mensagem = chalk.yellow("Erro interno no servidor do site.");
                        break;
                    default:
                        mensagem = chalk.red(`Status inesperado: ${status}`);
                }

                return { url, status: mensagem };

            } catch (err) {
                return {
                    url,
                    status: chalk.red("Domínio inexistente ou erro de rede.")
                };
            }
        })
    );

    return arrayStatus;
}

export default validarUrl;