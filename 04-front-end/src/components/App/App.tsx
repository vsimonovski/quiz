import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { GlobalStyle } from './App.style';
import './App.style.ts';
import './App.css';
import Home from '../../pages/Home/Home';

const App = () => {
    return (
        <Router>
            <GlobalStyle />
            <Switch>
                <Route exact path="/" component={Home} />
            </Switch>
        </Router>
    );
};

export default App;
