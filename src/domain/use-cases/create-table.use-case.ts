export interface CreateTableUseCase {

    execute: (options: CreateTableOptions) => string;
}

export interface CreateTableOptions {
    base: number;
    limit?: number;
}

export class CreateTable implements CreateTableUseCase {

    constructor(){
        /**
         * DI - Dependecy Injection
         */
    }

    execute({ base, limit = 10}: CreateTableOptions){
        const headerMessage: string = `----------------------------\nTABLA DEL ${base}\n----------------------------\n`;
        let message = '';
        for(let i = 1; i <= limit; i++){
            message += `${base} x ${i} = ${base*i}\n`;
        }
        return message = headerMessage + message;
    }
    
}