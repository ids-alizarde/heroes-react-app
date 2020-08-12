import '@testing-library/jest-dom';
import React from 'react';
import { mount } from 'enzyme'
import { AuthContext } from '../../../auth/AuthContext';
import { MemoryRouter, Router } from 'react-router-dom';
import { Navbar } from '../../../components/ui/NavBar';
import { CONSTANTS } from '../../../services/constantsService';

describe('Pruebas en <Navbar />', () => {

    const historyMock = {
        push: jest.fn(),
        replace: jest.fn(),
        location: {},
        listen: jest.fn(),
        createHref: jest.fn()     
    }

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name: 'Matias'
        }
    };

    const wrapper = mount(
        <AuthContext.Provider value={ contextValue } >
            <MemoryRouter>
                <Router history={ historyMock }>
                    <Navbar />
                </Router>
            </MemoryRouter>
        </AuthContext.Provider>
    );

    afterEach( () => {
        jest.clearAllMocks();
    });
    
    test('Debe de mostrar correctamente el componente <Navbar />', () => {
        
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find( '.text-info' ).text().trim() ).toBe( 'Matias' );
    });

    test('Debe de llamar el LogOut y usar history', () => {
        
        // wrapper.find( 'button' ).prop( 'onClick' );
        wrapper.find( 'button' ).props().onClick();

        expect( contextValue.dispatch ).toHaveBeenCalled();
        expect( contextValue.dispatch ).toHaveBeenCalledTimes(1);
        expect( contextValue.dispatch ).toHaveBeenCalledWith({
            type: CONSTANTS.logout 
        });
        expect( historyMock.replace ).toHaveBeenCalledWith( './login' );
    });
})
