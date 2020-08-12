import '@testing-library/jest-dom';
import React from 'react';
import { mount } from 'enzyme';
import { HeroScreen } from '../../../components/heroes/HeroScreen';
import { MemoryRouter, Route } from 'react-router-dom';

describe('Pruebas en <HeroScreen />', () => {

    const historyMock = {
        length: 10,
        push: jest.fn(),
        goBack: jest.fn()
    }

    test('Debe de mostrarse correctamente el componente <HeroScreen /> (muestra el Redirect si no hay argumentos en el URL', () => {

        const wrapper = mount( 
            <MemoryRouter initialEntries={[ '/hero'] }>
                <HeroScreen history={ historyMock } />
            </MemoryRouter>
        );

    //    expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find( 'Redirect' ).exists() ).toBe( true ) ;
    });

    test('Debe de mostrar un heroe si tiene parametros y el heroe existe', () => {
        
        const wrapper = mount( 
            <MemoryRouter initialEntries={[ '/hero/marvel-spider'] }>
                <Route path="/hero/:heroeId" component={ HeroScreen }/>
            </MemoryRouter>
        );

        expect( wrapper.find( '.row' ).exists() ).toBe( true );
        expect( wrapper.find( 'h3' ).at(0).text().trim() ).toBe( 'Spider Man' );
    });
    
    test('Debe de mandar a llamar el history.push', () => {

        const historyMock = {
            length: 1,
            push: jest.fn(),
            goBack: jest.fn()
        }
        
        const wrapper = mount( 
            <MemoryRouter initialEntries={[ '/hero/marvel-spider'] }>
                <Route path="/hero/:heroeId" component={() => <HeroScreen history={ historyMock } />}/>
            </MemoryRouter>
        );

        wrapper.find( 'button' ).props().onClick();
        
        expect( historyMock.push ).toHaveBeenCalled();
        expect( historyMock.push ).toHaveBeenCalledWith( '/' );
        expect( historyMock.goBack ).not.toHaveBeenCalled();
    });

    test('Debe de mandar a llamar el history.goBack', () => {
        
        const wrapper = mount( 
            <MemoryRouter initialEntries={[ '/hero/marvel-spider'] }>
                <Route path="/hero/:heroeId" component={() => <HeroScreen history={ historyMock } />}/>
            </MemoryRouter>
        );

        wrapper.find( 'button' ).prop( 'onClick' )();
        
        expect( historyMock.goBack ).toHaveBeenCalled();
        expect( historyMock.goBack ).toHaveBeenCalledWith();
        expect( historyMock.push ).not.toHaveBeenCalled();
        expect( historyMock.push ).toHaveBeenCalledTimes(0);
    });
    
    test('Debe de mandar a llamar el Redirect si el hero no existe', () => {
        
       const wrapper = mount( 
            <MemoryRouter initialEntries={[ '/hero/marvel-spider1234'] }>
                <Route path="/hero/:heroeId" component={() => <HeroScreen history={ historyMock } />}/>
            </MemoryRouter>
        );

        expect( wrapper.text() ).toBe( '' );
    });
    
})
