import fs from "fs/promises";

async function lerArquivo(caminhoArquivo) {
   
    const data = new Date().toLocaleString();
    const arquivoEstudantes = await fs.readFile(caminhoArquivo, "utf-8");

    try {
        await fs.access("./export_relatorio.txt"); // se existe não vai pro erro
        await fs.appendFile("./export_relatorio.txt", arquivoEstudantes + "\n");
    } catch (error) {
        await fs.writeFile("export_relatorio.txt", `Relatório Gerado para FATEC - ${data}\n` + "\n" + arquivoEstudantes + "\n");
    }
}

lerArquivo("./estudantes.csv");