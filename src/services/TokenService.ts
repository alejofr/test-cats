export class TokenService{
    private count: number;

    constructor(count:number){
        this.count = count;
    }

    /**
     * Generamos un hash aleatorio
     * 
     * @param chars 
     * @returns string[]
     */

    private hashRandom = (chars: string[]) : string[] => {
        let positionCurrent: number = chars.length;

        while (0 !== positionCurrent) {
            const posicionAleatoria = Math.floor(Math.random() * positionCurrent);
            positionCurrent--;
         
            [chars[positionCurrent],chars[posicionAleatoria]] = [
           chars[posicionAleatoria],chars[positionCurrent]];
        }
        return chars;
    }

    /**
     * Finalmente retornamos el token unico
     *
     * @returns string
    */

    token = () : string => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("");
        const hash = this.hashRandom(chars);

        return hash.slice(0,this.count).join("");
    }
}