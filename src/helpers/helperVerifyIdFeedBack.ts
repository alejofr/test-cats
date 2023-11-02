/**
 * Verificamos si existe un feedback, puede ser votos o favoritos
 * 
 * @param data 
 * @param id 
 * @param key 
 * @returns 
 */
export const helperVerifyIdFeedBack = <T extends object>(data: T[] | undefined, id: string, key: keyof T) : T | undefined => {
    return data ? data.find(item => item[key] == id) : undefined;
};