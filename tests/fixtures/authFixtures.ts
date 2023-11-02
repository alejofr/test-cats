import { AuthUser } from "../../src/interfaces"

export const initialState : AuthUser = {
    status: 'checking',
    user: null,
    token: null
   
}

export const authenticatedState : AuthUser = {
    status: 'authenticated',
    user: {
        email: 'demo@google.com',
        names: 'Demo User',
        surnames: 'Demo ss',
        nroPhone: '6161611551'
    },
    token: 'dsdkdsnkdsnsd2616'
}

export const notAuthenticatedState : AuthUser = {
    status: 'not-authenticated',
    user: null,
    token: null
}