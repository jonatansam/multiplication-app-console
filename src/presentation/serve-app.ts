import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { saveFile } from "../domain/use-cases/save-file.use-case";

interface RunOptions {
    base: number;
    limit: number;
    showTable: boolean;
    fileDestination: string;
    fileName: string;
}



export class ServerApp {

    static run({base, limit, showTable, fileDestination, fileName}: RunOptions){ 
        console.log('servidor corriendo!!');

        const table = new CreateTable().execute({base, limit});
        const wasCreated = new saveFile()
            .execute({
                fileContent: table, 
                fileDestination,
                fileName
            })

        if(showTable) console.log(table);
        //operador ternario sirve para hacer condiciones
        (wasCreated) 
            ? console.log('file creted!')
            : console.error("Error creating file");
    }
}