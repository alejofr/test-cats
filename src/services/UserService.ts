import { User } from "../interfaces/user";

export class UserService implements User{
    email: string;
    password: string;
    names: string;
    surnames: string;
    nroPhone: string;

    /**
     * Inicializamos las propiedades de la clase User
     * 
     * @param email 
     * @param password 
    */


    constructor(email: string, password: string){
        this.email = email;
        this.password = password;

        this.names = 'Abraham Alejandro';
        this.surnames = 'Freitez Becerra';
        this.nroPhone = '+58414513163';
    }

    /**
     * Comprobamos las credenciales, y devolvemos un booleano
     * true si las credenciales son correcta y false si son invalidas
     * 
     * @return boolean 
    */

    checkUserAuth = (email: string, password: string) : boolean =>  {
        return email === this.email && this.password === password;
    }

    /**
     * Retornamos un objecto de usuario
     *
     * @returns User
    */

    userValues = () : User => {
        return {
            email: this.email,
            names: this.names,
            surnames: this.surnames,
            nroPhone: this.nroPhone
        }
    }
}
