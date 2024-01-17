import fs from 'fs'
import { yarg } from './config/plugins/args.pluggins';

const {b: base, l: limite, s: showTable} = yarg;

let message: string = ''
const outputsPath: string = 'outputs';
const headerMessage: string = `
----------------------------
    TABLA DEL ${base}
----------------------------\n
`

for(let i = 1; i <= limite; i++){
    message += `${base} x ${i} = ${base*i}\n`;
}

message = headerMessage + message;

//return explisito cuando se devuelve en una linea, eliminamos las llaves 
if(showTable) console.log(message);

//crear la carpeta del path en caso de no estar en el directorio
fs.mkdirSync(outputsPath, {recursive: true});
fs.writeFileSync(`${outputsPath}/tabla-${base}.txt` , message)
console.log('file created');