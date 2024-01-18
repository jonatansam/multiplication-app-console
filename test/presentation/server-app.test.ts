import fs from 'fs';

import { CreateTable } from '../../src/domain/use-cases/create-table.use-case';
import { SaveFile } from '../../src/domain/use-cases/save-file.use-case';
import { ServerApp} from '../../src/presentation/server-app'

describe('test server-app.ts', () => {

    //opciones globales para las pruebas
    const options = {
        base: 2,
        limit: 10,
        showTable: false,
        fileDestination: 'test-destination',
        fileName: 'test-fileName',
    };

    afterEach( () => {
        const existsDirectoryTestLogs = fs.existsSync(options.fileDestination);
        if(existsDirectoryTestLogs) fs.rmSync(options.fileDestination, {recursive: true} );
    });


    test('should cretae ServerApp instance', () => {
        const serverApp = new ServerApp();
        expect(serverApp).toBeInstanceOf(ServerApp);
        expect( typeof ServerApp.run).toBe('function')
    });

    test('should run server app with options', () => {

        //ponemos un espia en el console.log para evaluar sus llamados
        const logSpy = jest.spyOn(console, 'log');
        const createTableSpy = jest.spyOn( CreateTable.prototype, 'execute');
        const saveFileSpy = jest.spyOn( SaveFile.prototype, 'execute');

        ServerApp.run(options);

        //esperamos que el console.log haya sido llamado 2 veces en el serverapp y que al menos una de ellas tenga el texto: 'Server running...'
        expect( logSpy ).toHaveBeenCalledTimes(2);
        expect( logSpy ).toHaveBeenCalledWith('Server running...');
        expect( logSpy ).toHaveBeenLastCalledWith('File Created!');

        //evaluamos la funcion del createTable con un spy
        expect( createTableSpy).toHaveBeenCalledTimes(1);
        expect( createTableSpy ).toHaveBeenCalledWith({ "base":options.base, "limit": options.limit});

        expect( saveFileSpy ).toHaveBeenCalledTimes(1);
        expect( saveFileSpy ).toHaveBeenCalledWith({
            "fileContent": expect.any(String),
            "fileDestination": options.fileDestination,
            "fileName": options.fileName
        });
    });

    test('should run with custom values mocked', () => {
        //cambiamos los metodos de cada clase por un mock jest.fn(), elimina el retorno de la funcion por undefined
        const logMock      = jest.fn();
        const logErrorMock = jest.fn();
        const createMock   = jest.fn().mockReturnValue('1 x 2 = 2');    //asignamos un mock de retorno para usar en las otras funciones
        const saveFileMock = jest.fn().mockReturnValue(true);

        console.log   = logMock;
        console.error = logErrorMock;
        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute    = saveFileMock;

        ServerApp.run(options);

        expect( logMock ).toHaveBeenCalledWith('Server running...');
        expect( createMock ).toHaveBeenCalledWith({ "base": options.base, "limit": options.limit});
        expect( saveFileMock ).toHaveBeenCalledWith({ 
            "fileContent": "1 x 2 = 2",
            "fileDestination": options.fileDestination,
            "fileName": options.fileName
        });
        expect( logMock ).toHaveBeenCalledWith('File Created!');
        expect( logErrorMock ).not.toHaveBeenCalledWith(); 
    })
})