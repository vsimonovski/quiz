import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { GlobalStyle } from './App.style';
import './App.style.ts';
import './App.css';
import Home from '../../pages/Home/Home';
import Form from '../../pages/Form/Form';
import Login from '../Login/Login';
import Registration from '../Registration/Registration';

const App = () => {
    return (
        <Router>
            <GlobalStyle />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login">
                    <Form>
                        <Login />
                    </Form>
                </Route>
                <Route path="/register">
                    <Form>
                        <Registration />
                    </Form>
                </Route>
                <Route path="*"><div>404</div></Route>
            </Switch>
        </Router>
    );
};

export default App;
