import React from 'react';
import { mount } from 'enzyme';
import { AuthContext } from '../../auth/AuthContext';
import { AppRouter } from '../../routers/AppRouter';


describe('Pruebas en <AppRouter />', () => {
    
    test('Debe de mostrar el componente LoginScren si no esta autenticado', () => {

        const contextValue = {
            dispatch: jest.fn(),
            user: {
                logged: false
            }
        };
        
        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <AppRouter />
            </AuthContext.Provider>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find( 'button' ).exists() ).toBe( true );
    });

    test('Debe de mostrar el componente MarvelScreen si esta autenticado', () => {

        const contextValue = {
            dispatch: jest.fn(),
            user: {
                logged: true,
                name: 'Matias'
            }
        };
        
        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <AppRouter />
            </AuthContext.Provider>
        );

        expect( wrapper.find( '.navbar' ).exists() ).toBe( true );
    });
    
})
