import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

export const GuardRoute = ({ children, type }: { children: JSX.Element | JSX.Element[], type: 'Public' | 'Private' }) => {

    const auth = useAppSelector(state => state.auth);

    if( type == 'Private' ){
        return (auth.status == 'authenticated')
        ? children
        : <Navigate to="/login" />
    }


    return (auth.status !== 'authenticated')
    ? children
    : <Navigate to="/cats" />
}
