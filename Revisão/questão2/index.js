import fs from "fs/promises"

async function verificar(caminhoArquivo) {
    const data = new Date().toLocaleString();
    
    try {
        await fs.access(caminhoArquivo);
        await fs.appendFile(caminhoArquivo, "Novo acesso registrado em: " + data + "\n");

    } catch (error) {
        await fs.writeFile(caminhoArquivo, "Novo acesso registrado em: " + data + "\n");
    }
}

verificar("log.txt");