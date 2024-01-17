import { yarg } from '../../../src/config/plugins/args.pluggins';

//modificamos los args para correr la aplicacion, con las banderas personaliadas
const runCommand = async (args: string[] ) => {

    process.argv = [...process.argv, ...args];
    const {yarg} = await import('../../../src/config/plugins/args.pluggins');
    return yarg;
}

describe('Test args.ts', () => {

    const originalArgv = process.argv;

    //antes de cada prueba reseteamos el argv ya que lo modificamos en cada prueba
    beforeEach( () => {
        process.argv = originalArgv;
        jest.resetModules();
    })

    test('should return default values', async() => {
        
        const argv = await runCommand(['-b','5'])   //añadimos los comandos necesarios para correr la app 
        expect(argv).toEqual( expect.objectContaining( {
            b: 5,
            l: 10,
            s: false,
            n: 'multiplication table',
            d: 'outputs',
        }));
    });

    test('should return configuration with custom values', async() => {
        const argv = await runCommand(['-b','7','-l','20','-n','table-seven','-d','tables','-s']);
        expect(argv).toEqual( expect.objectContaining( {
            b: 7,
            l: 20,
            s: true,
            n: 'table-seven',
            d: 'tables',
        }));
    });

 
})