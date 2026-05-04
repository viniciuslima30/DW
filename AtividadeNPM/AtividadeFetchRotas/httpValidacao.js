import fetch from "node-fetch";
import { urls } from "./leitor.js";
import chalk from "chalk";

async function validarUrl(urls) {
    const arrayLinks = await Promise.all(urls.map(async (url) => {
        try {
            const res = await fetch(url);
            const status = res.status;
            
            let message;

            switch (status) {
                case 200:
                    message = chalk.green("Site no ar e operante!");
                    break;
                case 400:
                    message = chalk.red("Página não encontrada.");
                    break;
                case 404:
                    message = chalk.red("Página não encontrada.");
                    break;
                case 500:
                    message = chalk.yellow("Erro interno no servidor do site.");
                    break;
            }

            return {"URL" : url, "STATUS": message || res.status};
        
        } catch (err) {
            const mensagem = chalk.redBright("Domínio inexistente ou erro de rede");
            return {"URL" : url, "STATUS": mensagem};
        }
    }));

    return arrayLinks;
}

export {validarUrl as urlsStatus};