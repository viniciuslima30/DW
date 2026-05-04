import fs from 'fs/promises';

async function extrairUrls(entrada) {

    const regex = /(https?:\/\/[^\s]+)/g; 

    try {
        await fs.access(entrada);
        const texto = await fs.readFile(entrada, "utf-8");
        const urlsExtraidas = texto.match(regex);
        
        return urlsExtraidas || [];
    } catch (err) {
        const urlsExtraidas = entrada.match(regex);

        return urlsExtraidas || [];
    }
}

export { extrairUrls as urls};