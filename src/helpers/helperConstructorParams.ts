/**
 * Retorna, la contruccion de una url con parametros. con la key=value
 *
 * @param value 
 * @returns string
*/

export const helperConstructorParams = <T extends Object>( value: T ) : string => {
    let aux: string = '';

    for (const key in value) {
        aux = aux + `${key}=${value[key]}`;
    }

    return aux;

}