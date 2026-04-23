// receba o endereço de um site (ou um arquivo contendo vários links)

import fs from "fs/promises"

async function extrairURLs(entrada) {

    const regexGlobal = /https?:\/\/(www\.)?[a-zA-Z0-9\-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?/g;

    // Tentar acessar texto caso esteja em um arquivo como .md, .txt

    try {
        await fs.access(entrada);
        const textoEntrada = await fs.readFile(entrada, "utf-8");
        const urlsExtraidas = textoEntrada.match(regexGlobal);
        
        return urlsExtraidas || [];

    } catch (error) {
        const urlsExtraidas = entrada.match(regexGlobal);

        return urlsExtraidas || [];
        
    }
}

export {extrairURLs as urls};