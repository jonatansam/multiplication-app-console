import { ServerApp } from "../src/presentation/server-app";


describe('Test app.ts', () => {

    test('should clall Server.run whit values', async() => {

        const serverRunMock = jest.fn();
        ServerApp.run       = serverRunMock;
        process.argv = ['node', 'app.ts','-b','10','-l','10','-n','test-file','-s','-d','test-destination'];

        await import('../src/app'); 

        expect(serverRunMock).toHaveBeenCalledWith({
            base:10,
            limit: 10,
            fileName:'test-file',
            showTable: true,
            fileDestination: 'test-destination'
        });
    })
})