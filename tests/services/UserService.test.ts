import { UserService } from "../../src/services/UserService";


describe('Pruebas en el UserService', () => {

    test('debe retornar un objecto de usuario, luego de instanciar', () => {

        const EMAIL = 'freitezabraham@gmail.com';
        const PASSWORD = '1234';
        const names = 'Abraham Alejandro';
        const surnames = 'Freitez Becerra';
        const nroPhone = '+58414513163';
        
        const user = new UserService(EMAIL, PASSWORD);

        expect( user.userValues() ).toStrictEqual({
            names,
            surnames,
            nroPhone,
            email: EMAIL
        });

    });


})