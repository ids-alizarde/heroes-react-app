import React from 'react';
import { mount } from 'enzyme'
import { PrivateRoutes } from '../../routers/PrivateRoutes';
import { MemoryRouter } from 'react-router-dom';

describe('Pruebas en <PrivateRoutes/>', () => {

    const props = {
        location: {
            pathname: '/marvel',
            search: '?q='
        }
    };

    const props2 = {
        location: {
            pathname: '/marvel',
            search: '?q=bat'
        }
    };

    const lastPath = ( props.location.search.length > 3 ) ? props.location.pathname + props.location.search : props.location.pathname

    Storage.prototype.setItem = jest.fn();
    
    test('Debe de mostra correctamente el componente <PrivateRoutes /> y guardar en el localStorage', () => {

        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoutes isAuthenticated={ true }
                            component={ () => <span>Listo!!</span>}
                            { ...props }
                />
            </MemoryRouter>
        );

        expect( wrapper.find( 'span' ).exists() ).toBe( true );
        expect( localStorage.setItem ).toHaveBeenCalledWith( 'lastPath', lastPath );
    });

    test('Debe de mostra correctamente el componente <PrivateRoutes /> y guardar en el localStorage con una busqueda', () => {

        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoutes isAuthenticated={ true }
                            component={ () => <span>Listo!!</span>}
                            { ...props2 }
                />
            </MemoryRouter>
        );

        expect( wrapper.find( 'span' ).exists() ).toBe( true );
        expect( localStorage.setItem ).toHaveBeenCalledWith( 'lastPath', '/marvel?q=bat' );
    });

    test('No debe de mostrar el componente si no esta autenticado', () => {

        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoutes isAuthenticated={ false }
                            component={ () => <span>Listo!!</span>}
                            { ...props }
                />
            </MemoryRouter>
        );

        expect( wrapper.find( 'span' ).exists() ).toBe( false );
        expect( localStorage.setItem ).toHaveBeenCalledWith( 'lastPath', lastPath );
    });
    
})
