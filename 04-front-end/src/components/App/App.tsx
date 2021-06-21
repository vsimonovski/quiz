import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import { GlobalStyle} from "./App.style";
import './App.style.ts';

function App() {
    return (
        <div className="App">
            <Router>
                <GlobalStyle/>
            </Router>
        </div>
    )
}

export default App;
