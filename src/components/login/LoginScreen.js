import React, { useContext } from 'react';
import { CONSTANTS } from '../../services/constantsService';
import { AuthContext } from '../../auth/AuthContext';

export const LoginScreen = ({ history }) => {

    const { dispatch } = useContext( AuthContext );
    const lastPath = localStorage.getItem( 'lastPath' ) || '/';

    const handleLogin = () => {
        
        // history.push('/');
        // history.replace('/');

        const action = {
            type: CONSTANTS.login,
            payload: {
                name: 'Aldo Ivan'
            }
        }

        dispatch(action);
        history.replace( lastPath );
    }
        
    return (
        <div className="container mt-5">
            <h1>Login Screen</h1>
            <hr/>

            <button className="btn btn-primary" onClick={ handleLogin }>
                Ingresar
            </button>
        </div>
    )
}
