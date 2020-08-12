import '@testing-library/jest-dom';
import { authReducer } from '../../auth/authReducer';
import { CONSTANTS } from '../../services/constantsService';

describe('Pruebas en authReducer', () => {

    const initialState = {
        name: 'Aldo',
        logged: true
    };

    test('Debe de mostrar el estado por defecto', () => {

        const state = authReducer( initialState, {} );
        expect( state ).toEqual( initialState );
    });

    test('Debe autenticar y poner el nombre en el name', () => {
        
        const action = {
            type: CONSTANTS.login,
            payload: {
                name: 'Aldo'
            }
        };
        const state = authReducer( initialState, action );

        expect( state ).toEqual( initialState );
        expect( state.logged ).toBe( true );
        expect( state.name ).toBe( initialState.name );

    });
    
    test('Debe de borrar el name del usuario y logged en false', () => {

        const action = {
            type: CONSTANTS.logout,
        };
        const state = authReducer( initialState, action );

        expect( state.logged ).toBe( false );
        
    });
})
