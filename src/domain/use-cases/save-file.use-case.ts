import fs from 'fs';

export interface SaveFileUseCase {
    execute: (options: Options) => boolean;
}

export interface Options {
    fileContent : string;
    fileDestination: string;
    fileName   : string;
}

export class saveFile implements SaveFileUseCase {

    constructor(){
        /**repository: storageRepository */
    }

    execute({fileContent, fileDestination, fileName }: Options) : boolean {

        try {           
            //crear la carpeta del path en caso de no estar en el directorio
            fs.mkdirSync(fileDestination, {recursive: true});
            fs.writeFileSync(`${fileDestination}/${fileName}.txt` , fileContent)
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };
    
}