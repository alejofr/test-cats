import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './slices';
import { theCatApi } from './apis';

export const Store = configureStore({
  reducer: {
    auth: authSlice.reducer,

    [theCatApi.reducerPath]: theCatApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat( theCatApi.middleware )
})

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch
