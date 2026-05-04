import { urls } from "./leitor.js";
import { urlsStatus } from "./httpValidacao.js";

async function processarEntrada(entrada) {
    const urlsExtraidas = await urls(entrada[2]);
    const respostaUrls = await urlsStatus(urlsExtraidas);
    respostaUrls.forEach(elemento => {
        console.log(`URL: ${elemento.URL}
STATUS: ${elemento.STATUS}
`
);
    })
}

processarEntrada(process.argv);