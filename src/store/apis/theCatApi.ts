import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { helperConstructorParams, reqFetch } from '../../helpers';
import { 
    Breed, 
    Category, 
    ParamsSearchImages, 
    SearchImages,
    Favorite, 
    Vote
} from '../../interfaces';


const API_URL = 'https://api.thecatapi.com/v1';
const API_KEY = 'live_Eua1p6GYEk47128FcGlYJGtMMrUhzcqL5jsODW8nLDxKRfmmza4LAWnPZ8fXuANZ';


export const theCatApi = createApi({

    reducerPath: 'cats',

    baseQuery: fetchBaseQuery({
        baseUrl: API_URL, // url peticion
        prepareHeaders: (headers) => {
            // Configuracion de header y envio de api key obtenido en https://thecatapi.com/
            headers.set("Content-type", "appliation/json"),
            headers.set("x-api-key", API_KEY);
            
            return headers;
        },
       
    }),
    endpoints: (builder) => ({

        /**
         * Obtenemos la lista de razas de gatos
        */
        getAllBreeds: builder.query<Breed[], {}>({
            query: () => '/breeds'
        }),

        /**
         * Obtenemos toda las categorias de gatos 
        */

        getAllCategories: builder.query<Category[], {}>({
            query: () => '/categories'
        }),

        /**
         * Obtenemos las imagenes, podemos pasarle parametros, expecificado en la interface ParamsSearchImages
         * 
         * @params ParamsSearchImages
        */

        getImages: builder.query<SearchImages[], ParamsSearchImages>({
            query: (params: ParamsSearchImages) => `/images/search?${helperConstructorParams(params)}`
        }),

        /**
         * Seccion de gatos favoritos
        */

        // obtenemos todos los gatos favoritos
        getFavorites: builder.query<Favorite[], {}>({
            query: () => '/favourites'
        }),

        // guardamos favorito
        createFavorite: builder.mutation<{message:string, id: number}, { image_id: string }>({
            queryFn: async(arg) =>{
                const resp = await reqFetch('POST', `${API_URL}/favourites`, {
                    'x-api-key': API_KEY
                }, arg);

                return resp;
            } 
        }),

        // eliminamos favorito
        deleteFavorite: builder.mutation<{ message:string }, { id: number }>({
           queryFn: async(arg) =>{
                const resp = await reqFetch('DELETE', `${API_URL}/favourites/${arg.id}`, {
                    'x-api-key': API_KEY
                });

                return resp;
            } 
        }),

        /**
         * Seccion votaciones de gatos
        */
        
        // obtenemos todos las votaciones de gatos
        getVotes: builder.query<Vote[], {}>({
            query: () => '/votes'
        }),

        // guardamos la votacion de gato
        createVote: builder.mutation<{}, { image_id: string, value: number }>({
            queryFn: async(arg) =>{
                const resp = await reqFetch('POST', `${API_URL}/votes`, {
                    'x-api-key': API_KEY
                }, arg);

                return resp;
            } 
        }),
    })

})

export const { 
    useGetAllBreedsQuery,
    useGetAllCategoriesQuery,
    useGetImagesQuery,
    useGetFavoritesQuery,
    useCreateFavoriteMutation,
    useDeleteFavoriteMutation,
    useGetVotesQuery,
    useCreateVoteMutation
} = theCatApi;

