/**
 * Retorna, la contruccion de una url con parametros. con la key=value
 *
 * @param value 
 * @returns string
*/

export const helperConstructorParams = <T extends Object>( value: T ) : string => {
    let aux: string = '';
    let i = 0;


    for (const key in value) {

        switch (i) {
            case 0:
                aux = `${key}=${value[key]}`
                break;
        
            default:
                aux = aux + `${key}=${value[key]}`
                break;
        }

        i++;
    }

    return aux;

}