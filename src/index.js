import '@testing-library/jest-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { HeroesApp } from './HeroesApp';

ReactDOM.render(
    <HeroesApp />,
    document.getElementById('root')
);
