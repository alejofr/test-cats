import { authSlice, authenticate, notAuthenticate } from '../../../../src/store/slices/auth';
import { authenticatedState, notAuthenticatedState } from '../../../fixtures/authFixtures';


describe('Pruebas en el authSlice', () => {

    test('debe de realizar el logout', () => {
        
        const state = authSlice.reducer(notAuthenticatedState, notAuthenticate());

        expect( state ).toEqual( notAuthenticatedState );
        expect( authSlice.name ).toBe('auth');

    });

    test('debe de realizar la autentificacion del usuario', () => {
        
        const state = authSlice.reducer(authenticatedState, authenticate({ user: authenticatedState.user, token: authenticatedState.token }));

        expect( state ).toEqual( authenticatedState );
        expect( authSlice.name ).toBe('auth');

    });

});