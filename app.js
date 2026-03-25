import chalk from "chalk";
import fs from "fs";
// import fs from "fs/promises"; se não quiser usar promise no async porque já vem imbutido

const texto = "São geralmente recuperados a partir de um objeto FileList que é retornado como resultado da seleção, pelo usuário, de arquivos através do elemento [](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/Input), a partir do objeto [DataTransfer](https://developer.mozilla.org/pt-BR/docs/Web/API/DataTransfer) utilizado em operações de arrastar e soltar, ou a partir da API `mozGetAsFile()` em um [HTMLCanvasElement](https://developer.mozilla.org/pt-BR/docs/Web/API/HTMLCanvasElement). Em Gecko, códigos com privilégiios podem criar objetos File representando qualquer arquivo local sem a intereção do usuário (veja [Implementation notes](https://developer.mozilla.org/pt-BR/docs/Web/API/File#implementation_notes) para mais informações.)"

function extrairLinks(texto) {
    const regex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/gm;
    //const linksExtraidos = texto.match(regex);
    //const linksExtraidos = regex.exec(texto);
    const arrayResultados = [];
    let temp;
    while ((temp = regex.exec(texto)) != null) {
        arrayResultados.push({[temp[1]]:[temp[2]]});
    }
    
    return arrayResultados;
}

extrairLinks(texto);


function trataErro(erro) {
    throw new Error(chalk.bgRedBright(erro, ": Arquivo não encontrado no caminho"));
}

// Lendo arquivo de forma sincrona (não interessante)
/*
function pegaArquivo(caminhoDoArquivo) {
    fs.readFile(caminhoDoArquivo, 'utf-8', (erro, texto) => {
        if (erro) {
            trataErro(erro);
            return;
        }

        console.log(chalk.bgGreenBright(texto));
    });
}
*/

// Lendo arquivo de forma assincrona com promessa (interessante)

/*
function pegaArquivo(caminhoDoArquivo) {
    fs.promises
    .readFile(caminhoDoArquivo, 'utf-8')
    .then(texto => console.log(chalk.bgBlueBright(texto)))
    .catch(erro => trataErro(erro));
}
*/

// Lendo arquivo de forma assincrona de forma moderna com async e await (super interessante)

async function pegaArquivo(caminhoDoArquivo) {
    try {
        const texto = await fs.promises.readFile(caminhoDoArquivo, 'utf-8'); // use fs/promise se não quer escrever promises
        console.log(extrairLinks(texto));
    } catch (erro) {
        trataErro(erro);
    }
}

pegaArquivo("./arquivos/texto.md");