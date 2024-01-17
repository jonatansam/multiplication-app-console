import { error } from "console";
import yargs, { number } from "yargs";
import { hideBin } from 'yargs/helpers';

//hideBin oculta ruta del path en los argv
//demanoption la opcion es requerida o no 

export const yarg = yargs(hideBin(process.argv) )
    .option('b', {
        alias: 'base',
        type: 'number',
        demandOption: true,
        describe: 'multiplication table base'
    })
    .option('l',{
        alias:'limit',
        default:10,
        type:'number',
        describe : 'Multiplication limit'
    })
    .option('s', {
        alias: 'show',
        type: 'boolean',
        default: false,
        describe: 'show multiplication app'
    })
    .option('n', {
        alias: 'name',
        type: 'string',
        default: 'multiplication table',
        describe: 'file name'
    })
    .option('d', {
        alias: 'destination',
        type: 'string',
        default: 'outputs',
        describe: 'destination file'
    })
    .check( (argv, options) => {
        
        //si el argumento b es menor a 1 entonces devuelve un error
        if(argv.b < 1 ) throw new Error('Error: base must be greater than 0');

        return true;
    })
    .parseSync();


