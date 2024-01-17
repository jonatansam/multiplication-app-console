import { ServerApp} from '../../src/presentation/server-app'

describe('test server-app.ts', () => {

    test('should cretae ServerApp instance', () => {
        const serverApp = new ServerApp();
        expect(serverApp).toBeInstanceOf(ServerApp);
        expect( typeof ServerApp.run).toBe('function')
    });
})