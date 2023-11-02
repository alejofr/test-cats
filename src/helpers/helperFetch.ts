import axios, { AxiosResponse } from 'axios';

export const reqFetch = async(method: 'POST' | 'DELETE', url: string, headers?: any, data?: any ) : Promise<AxiosResponse<any, any> | any > => {
    try {
        const resp: AxiosResponse<any, any> = await axios.request({
            method,
            url,
            headers,
            data
        })

        return resp;
    } catch (error) {
        return error;
    }
} 