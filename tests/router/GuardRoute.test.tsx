import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { authSlice } from "../../src/store/slices/auth";
import { authenticatedState, notAuthenticatedState } from "../fixtures/authFixtures";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { GuardRoute } from "../../src/router/GuardRoute";




describe('Pruebas en <GuardRoute />', () => {

    test('debe de navegar si no está autenticado', () => {

        const store = configureStore({
            reducer: {
                auth: authSlice.reducer
            },
            preloadedState: {
                auth: notAuthenticatedState
            }
        })

        render(
            <Provider store={ store }>
                <MemoryRouter initialEntries={['/login']}>
                    <Routes >
                        <Route path='login/*' element={
                            <GuardRoute type='Public'>
                                <h1>Ruta pública</h1>
                            </GuardRoute>
                        } />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        expect( screen.getByText('Ruta pública') ).toBeTruthy();

    })

    test('intentando acceder a rutas protegida', () => {

        const store = configureStore({
            reducer: {
                auth: authSlice.reducer
            },
            preloadedState: {
                auth: notAuthenticatedState
            }
        })

        render(
            <Provider store={ store }>
                <MemoryRouter initialEntries={['/']}>
                    <Routes >
                        <Route path='login/*' element={
                            <GuardRoute type='Public'>
                                <h1>Ruta pública</h1>
                            </GuardRoute>
                        } />

                        <Route path='' element={
                            <GuardRoute type='Private'>
                                <h1>Ruta Privada</h1>
                            </GuardRoute>
                        } />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        expect( screen.getByText('Ruta pública') ).toBeTruthy();

    })

    test('Debe navegar si esta autentificado', () => {

        const store = configureStore({
            reducer: {
                auth: authSlice.reducer
            },
            preloadedState: {
                auth: authenticatedState
            }
        })

        render(
            <Provider store={ store }>
                <MemoryRouter initialEntries={['/']}>
                    <Routes >
                        <Route path='login/*' element={
                            <GuardRoute type='Public'>
                                <h1>Ruta pública</h1>
                            </GuardRoute>
                        } />

                        <Route path='' element={
                            <GuardRoute type='Private'>
                                <h1>Ruta Privada</h1>
                            </GuardRoute>
                        } />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        expect( screen.getByText('Ruta Privada') ).toBeTruthy();

    })

})