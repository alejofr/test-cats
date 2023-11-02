import { TokenService } from "../../src/services/TokenService";

describe('Pruebas en el TokenService', () => {

    test('debe retornar un string y la cantidad de caracteres', () => {
        const countChars = 62;

        const token = new TokenService(countChars);

        expect( token.token() ).toMatch(/[A-Z]|[a-z]|[0-9]/g);

        expect( token.token().length ).toBe(countChars);

    });


})