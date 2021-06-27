import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { GlobalStyle } from './App.style';
import './App.style.ts';
import './App.css';
import Home from '../../pages/Home/Home';
import Form from '../../pages/Form/Form';
import Login from '../Login/Login';
import Registration from '../Registration/Registration';

// lazy loaded components
const Game = lazy(() => import('../../pages/Game/Game'));

const App = () => {
    return (
        <Router>
            <GlobalStyle />
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/game" component={Game} />
                    <Route path="/login">
                        <Form title="Log in">
                            <Login />
                        </Form>
                    </Route>
                    <Route path="/register">
                        <Form title="Register">
                            <Registration />
                        </Form>
                    </Route>
                    <Route path="*">
                        <div>404</div>
                    </Route>
                </Switch>
            </Suspense>
        </Router>
    );
};

export default App;
