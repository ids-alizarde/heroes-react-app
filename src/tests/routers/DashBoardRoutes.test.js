import React from 'react';
import { mount } from 'enzyme'
import { AuthContext } from '../../auth/AuthContext';
import { MemoryRouter } from 'react-router-dom';
import { DashBoardRoutes } from '../../routers/DashBoardRoutes';


describe('Pruebas en <DashBoardRoutes />', () => {

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name: 'Matias'
        }
    };
    
    test('Debe de mostrar correctamente el componente <DashBoardRoutes />', () => {
        
        const wrapper = mount(
            <AuthContext.Provider value={{ user: { name: 'Matias', logged: true }, dispatch: jest.fn() }}>
                <MemoryRouter>
                    <DashBoardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find( '.text-info' ).text().trim() ).toBe( 'Matias' );
    });
    
})
