import {SaveFile} from '../../../src/domain/use-cases/save-file.use-case'
import fs from 'fs';

describe('save-file.use-case.ts', () => {

    const customOptions = {             //ponemos las opciones personalizadas en el scope superior de la prueba
        fileContent : 'custom content',
        fileDestination: 'custom-outputs/file-destination',
        fileName   : 'custom-table-name',
    };
    const customFilePath: string = `${customOptions.fileDestination}/${customOptions.fileName}.txt`

  
    afterEach(() => {         //ciclo de vida de la prueba: despues de cada prueba afterEach()
        const exitsDirectory = fs.existsSync('outputs');
        const exitsDirectory2 = fs.existsSync(customOptions.fileDestination);
        if(exitsDirectory) fs.rmSync('outputs', {recursive: true});  //clean directory
        if(exitsDirectory2) fs.rmSync(customOptions.fileDestination, {recursive: true});
    })

    test('should save file whith default values', () => {
         const saveFile = new SaveFile();
         const options = {
            fileContent: 'test content'
         }
         const filePath: string = 'outputs/table.txt';

         const result = saveFile.execute(options);
         const fileExists = fs.existsSync(filePath);        //evaluamos si se crea el archivo en el directorio y el contenido del el mismo
         const fileContent = fs.readFileSync(filePath, {encoding: 'utf-8'});

         expect(result).toBeTruthy();
         expect(fileExists).toBe(true);
         expect(fileContent).toBe(options.fileContent);
    });

    test('should save file with custom values', () => {
        

        const result = new SaveFile().execute(customOptions);
        const fileExists = fs.existsSync(customFilePath);        //evaluamos si se crea el archivo en el directorio y el contenido del el mismo
        const fileContent = fs.readFileSync(customFilePath, {encoding: 'utf-8'});

        expect(result).toBeTruthy();
        expect(fileExists).toBe(true);
        expect(fileContent).toBe(customOptions.fileContent); 
    });

    test('should return false if directory could not be created', () => {
        const saveFile = new SaveFile();

        //con el mockImplementation sobreescribimos el metodo con el callback que pongamos
        //cuando trabajamos con el mockimplementation tenemos que eliminarlos al terminar la prueba
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation( () => {
            throw new Error('This is a custom error from testing');
        })

        const result = saveFile.execute(customOptions);

        expect(result).toBe(false);
        mkdirSpy.mockRestore();  //elimminamos el mock y restauramos la funcion original
    });

    test('should return false if file could not be created', () => {
        const saveFile = new SaveFile();
        const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation( () => {
            throw new Error('This is a custom error writting error message');
        })

        const result = saveFile.execute(customOptions);

        expect(result).toBe(false);
        writeFileSpy.mockRestore();
    });
}) 