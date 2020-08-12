import '@testing-library/jest-dom';
import React from 'react';
import { mount } from 'enzyme'
import { MemoryRouter, Route } from 'react-router-dom';
import { SearchScreen } from '../../../components/search/SearchScreen';



describe('Pruebas en <SearchScreen />', () => {
    
    test('Debe de mostrarse correctamente el componente <SearchScreen /> con los valores por defautl ', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={[ '/search' ]}>
                <Route path="/search" component={ SearchScreen } />
            </MemoryRouter>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find( '.alert-info' ).text().trim() ).toBe( 'Search a hero' );
    });

    test('Debe mostrar a Batman y el input con el valor del queryString', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={[ '/search?q=batman' ]}>
                <Route path="/search" component={ SearchScreen } />
            </MemoryRouter>
        );

        expect( wrapper.find( 'input' ).props().value ).toBe( 'batman' );
        expect( wrapper.find( 'HeroCard' ).exists() ).toBe( true );
        expect( wrapper ).toMatchSnapshot();
    });
    
    test('Debe de mostrar un error si no existe el Hero', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={[ '/search?q=batman123123123' ]}>
                <Route path="/search" component={ SearchScreen } />
            </MemoryRouter>
        );

        expect( wrapper.find( '.alert-danger' ).exists() ).toBe( true );
        expect( wrapper.find( '.alert-danger' ).text().trim() ).toBe( 'There aren`t a heroes with batman123123123' );
        expect( wrapper ).toMatchSnapshot();
    });

    test('Debe llamar history.push()', () => {
        
        const historyMock = {
            push: jest.fn()
        }

        const wrapper = mount(
            <MemoryRouter initialEntries={[ '/search?q=batman' ]}>
                <Route path="/search" component={ () => <SearchScreen history={ historyMock } /> }/>
            </MemoryRouter>
        );

        wrapper.find( 'input' ).simulate( 'change', {
            target: {
                name: 'search',
                value: 'batman'
            }
        });

        // wrapper.find( 'input' ).prop( 'onChange')( ({
        //     target: {
        //         name: 'search',
        //         value: 'batma'
        //     }
        // }));

        // wrapper.find( 'input' ).props().onChange(( { 
        //     target: {
        //         name: 'search',
        //         value: 'bat'
        //     }     
        // }));

        wrapper.find( 'form' ).props().onSubmit({ preventDefault(){} });
        
        expect( historyMock.push ).toHaveBeenCalled();
        expect( historyMock.push ).toHaveBeenCalledWith( '?q=batman' );
    });
    
})
