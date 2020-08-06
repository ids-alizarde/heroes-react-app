import React, { useMemo } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { getHeroesById } from '../../selectors/getHeroesById';

export const HeroScreen = ({ history }) => {

    const { heroeId } = useParams();
    const heroe = useMemo(() => getHeroesById( heroeId ), [ heroeId ])
    // const heroe = getHeroesById( heroeId );

    if( !heroe ){
        return <Redirect to="/"/>
    }

    const handleReturn = () => {
        
        if( history.length <= 2 ){
            history.push('/')
        } else{
            history.goBack();
        }
    }

    return (
        <div className="row mt-5">
            <div className="col-4">
                <img src={ `../assets/heroes/${ heroeId }.jpg` } className="img-thumbnail animate__animated animate__rubberBand" alt={ heroe.superhero }/>
            </div>
            <div className="col-8 animate__animated animate__fadeInRight">
                <h3>{ heroe.superhero }</h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><b>Alter Ego: </b>{ heroe.alter_ego }</li>
                    <li className="list-group-item"><b>Publisher: </b>{ heroe.publisher }</li>
                    <li className="list-group-item"><b>First Appearance: </b>{ heroe.first_appearance }</li>
                </ul>
                <h5>Characters</h5>
                <p>{ heroe.characters }</p>
                <button className="btn btn-outline-info" onClick={ handleReturn }>Return</button>
            </div>
        </div>
    )
}
