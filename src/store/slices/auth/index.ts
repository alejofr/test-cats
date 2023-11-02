import { createSlice } from '@reduxjs/toolkit';
import { AuthUser } from '../../../interfaces/auth';


// Inicializamos los valores del estado por defecto.
const initialState: AuthUser ={
    user: null,
    token: null,
    status: 'checking'
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        // autentificamos el usuario
        authenticate: ( state, action ) => {
            state.status = 'authenticated';
            state.token = action.payload.token;
            state.user = action.payload.user;
        },

        // no autentificar el usuario
        notAuthenticate: (state) => {
            state.status = 'not-authenticated';
            state.token = null;
            state.user = null;
        }
    }
});


// Action creators are generated for each case reducer function
export const { authenticate, notAuthenticate } = authSlice.actions;