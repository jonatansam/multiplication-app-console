import { yarg } from './config/plugins/args.pluggins';
import { ServerApp } from './presentation/server-app';

//funcion anonima autoinvocada
( async () => {
    await main();
})();

async function main() {
   
    const {b: base, l: limit, s: showTable, n: fileName, d: fileDestination} = yarg;

    ServerApp.run({ base, limit, showTable, fileDestination, fileName});

}


// console.log(yarg);