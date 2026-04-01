import fs from "fs/promises";

async function lerArquivo(caminhoArquivo) {
    try {
        const arquivo = JSON.parse(await fs.readFile(caminhoArquivo, "utf-8"));
        console.log(`Configuração carregada para o curso [${arquivo[0].curso}] no campus [${arquivo[0].campus}]`);
    } catch (error) {
        throw new Error(error);
    }
}

lerArquivo("./config.json");