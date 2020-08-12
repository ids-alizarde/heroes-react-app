import '@testing-library/jest-dom';
import React from 'react';
import { mount } from 'enzyme';
import { LoginScreen } from '../../../components/login/LoginScreen';
import { AuthContext } from '../../../auth/AuthContext';
import { CONSTANTS } from '../../../services/constantsService';


describe('Pruebas en el componente <LoginScreen />', () => {

    const contextValue = {
        user: { 
            logged: false 
        },
        dispatch: jest.fn()
    }

    const historyMock = {
        replace: jest.fn()
    }

    let wrapper = mount(
        <AuthContext.Provider value={ contextValue }>
            <LoginScreen history={ historyMock }/>
        </AuthContext.Provider>
    );

    beforeEach( () => {
        jest.clearAllMocks();
        wrapper = mount(
        <AuthContext.Provider value={ contextValue }>
            <LoginScreen history={ historyMock }/>
        </AuthContext.Provider>
    );
    });

    test('Debe de mostrar el <LoginScreen /> correctamente', () => {

        expect( wrapper ).toMatchSnapshot();
    });
    
    test('Debe de mandar a llamar el dispatch y realizar la navegacion esperada', () => {

        const action = {
            type: CONSTANTS.login,
            payload: {
                name: 'Aldo Ivan'
            }
        }
        
        wrapper.find( 'button' ).simulate( 'click' );

        expect( contextValue.dispatch ).toHaveBeenCalled();
        expect( contextValue.dispatch ).toHaveBeenCalledWith( action );
        expect( historyMock.replace ).toHaveBeenCalled();
        expect( historyMock.replace ).toHaveBeenCalledWith( '/' );
    });

    test('Debe de mandar a llamar el dispatch y realizar la navegacion esperada y el localStorage', () => {

        const action = {
            type: CONSTANTS.login,
            payload: {
                name: 'Aldo Ivan'
            }
        }

        const handleClick = wrapper.find( 'button' ).prop( 'onClick' );
        handleClick();

        expect( contextValue.dispatch ).toHaveBeenCalledWith( action );

        localStorage.setItem( 'lastPath', '/marvel');
        handleClick();

        expect( historyMock.replace ).toHaveBeenCalledWith( '/marvel' );
        expect( historyMock.replace ).toHaveBeenCalledTimes(2);
    });
})
