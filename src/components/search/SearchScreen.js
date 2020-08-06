import React, { useMemo } from 'react';
import queryString from 'query-string'
import { HeroCard } from '../heroes/HeroCard';
import { useForm } from '../../hooks/useForm';
import { useLocation } from 'react-router-dom';
import { getHeroesByName } from '../../selectors/getHeroesByName';

export const SearchScreen = ({ history }) => {

    const location = useLocation();
    const { q = '' } = queryString.parse( location.search );

    const [ formValues, handleInputChange ] = useForm({
        search: q
    });

    const { search } = formValues;
    const heroesFiltered = useMemo(() => getHeroesByName( q ), [ q ]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        history.push( `?q=${ search }` )
    }

    return (
        <div>
            <h1>Search Screen</h1>
            <hr/>

            <div className="row">
                <div className="col-5">
                    <h4>Search Form</h4>
                    <hr/>

                    <form onSubmit={ handleSubmit }>
                        <input type="text"
                                autoComplete="off"
                                name="search" 
                                placeholder="Find your Hero"
                                className="form-control"
                                value={ search }
                                onChange={ handleInputChange }/>

                        <button type="submit"
                                className="btn btn-block btn-outline-primary m-1">
                            Search
                        </button>
                    </form>
                </div>
                <div className="col-7">
                    <h4>Results</h4>
                    <hr/>

                    {
                        ( q === '' ) 
                            &&
                            <div className="alert alert-info">
                                Search a hero
                            </div>
                    }

                    {
                        ( q !== '' && heroesFiltered.length === 0 ) 
                            &&
                            <div className="alert alert-danger">
                                There aren`t a heroes with { q }
                            </div>
                    }

                    {
                        heroesFiltered.map( hero => (
                            <HeroCard key={ hero.id }
                                    heroe={ hero }/>
                        ))
                    }

                </div>
            </div>
        </div>
    )
}
