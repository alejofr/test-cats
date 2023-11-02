import { CookieService } from './CookieService';
import { TokenService } from "./TokenService";
import { UserService } from "./UserService";
import { User } from "../interfaces/user";


interface ResponseOnAuth { 
    ok:         boolean, 
    message?:   string, 
    user?:      User, 
    token?:     string 
}

const COOKIE_NAME = 'token';

/**
 * Datos de simulacion para el login o bien conocido como Mock
*/
const EMAIL = 'freitezabraham@gmail.com';
const PASSWORD = '1234';

export class AuthService{

    /**
     * Funcion que simula la autentificacion de un usuario
     * 
     * @param user Inyeccion de depedencia UserService 
     * @returns ResponseOnAuth
    */

    static onLogin = (user: UserService) : ResponseOnAuth => {
        if( !user.checkUserAuth(EMAIL, PASSWORD) ){
            return {
                ok: false,
                message: 'Credenciales Incorrectas'
            }
        }

        // generar un token, para la autentificacion
        const tokenService = new TokenService(62);

        //generamos la cookie
        CookieService.saveCookie(COOKIE_NAME, tokenService.token());

        return {
            ok: true,
            user: user.userValues(),
            token: tokenService.token()
        }
    }

    /**
     * Comprobamos si existe una autentificacion
     * 
     * @returns ResponseOnAuth
    */

    static checkAuth = () : ResponseOnAuth => {
        const token =  CookieService.getCookie(COOKIE_NAME);

        

        // comprobamos si no es undefined
        if( token !== undefined ){
            const user = new UserService(EMAIL, PASSWORD); // INICIALIZAMOS CON LAS CREDENCIALES "REALES" o Mock

            return{
                ok: true,
                user: user.userValues(),
                token
            }
        }

        return {
            ok: false,
        }
    }

    /**
     * Eliminar Cookie
    */

    static onLogout = () => {
        // eliminamos la cookie
        CookieService.deleteCookie(COOKIE_NAME);
    }


}