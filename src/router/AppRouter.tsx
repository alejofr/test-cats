import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { authenticate, notAuthenticate } from '../store/slices/auth';
import { AuthService } from '../services';
import { GuardRoute } from './GuardRoute';
import { AppLayout } from '../layouts';

import { 
    Cats, 
    Search,
    Favorites,
    Vote,
    Profile,
    Login
} from '../pages';


export const AppRouter = () => {
    const auth = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const { token, user } = AuthService.checkAuth();

        setTimeout(() => {
                if( token && user ){
                    dispatch( authenticate({ user, token }) );
                }else{
                    dispatch( notAuthenticate() );
                }  
        }, 1500);
    
    }, [])
    
    const logout = () => {
        AuthService.onLogout();
        dispatch( notAuthenticate() );
    }

    if( auth.status == 'checking' ){
        return (
            <div className='d-flex flex-column justify-content-center align-items-center w-100 min-vh-100'>
                <Spinner 

                />
            </div>
        )
    }

    return (
        <AppLayout showSidebar={auth.status === 'authenticated'} onLogout={logout}>
            <Routes>
                <Route 
                    path='login/*'
                    element={
                        <GuardRoute type='Public'>
                            <Login />
                        </GuardRoute>
                    }
                />
                <Route 
                    path='/*'
                    element={
                        <GuardRoute type='Private'>
                            <Routes>
                                <Route 
                                    path='profile'
                                    element={<Profile />}
                                />
                                <Route 
                                    path='cats'
                                    element={<Cats />}
                                >
                                    <Route 
                                        index
                                        element={<Search />}
                                    />
                                    <Route 
                                        path='favorites'
                                        element={<Favorites />}
                                    />
                                    <Route 
                                        path='votes'
                                        element={<Vote />}
                                    />
                                </Route>
                                <Route path="*" element={<Navigate to="/cats" />}/>
                            </Routes>
                        </GuardRoute>
                    }
                /> 
            </Routes>
        </AppLayout>
    
    )
}
