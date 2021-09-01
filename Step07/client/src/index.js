import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Profile from './Profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from "./Component/navigationBar";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Dashboard from "./Dashboard";
import Cookies from 'js-cookie';


ReactDOM.render(
    <React.StrictMode>
        <Router>
            <NavigationBar/>
            <Switch>
                <Route exact path="/">
                    <App/>
                </Route>
                <Route exact path="/Profile" component={Profile}>
                    {Cookies.get("Token") ? <Profile/>:<Redirect to="/"/>}
                </Route>
                <Route exact path="/Dashboard" component={Dashboard}>
                    {Cookies.get("Token") ? <Dashboard/>:<Redirect to="/"/>}
                </Route>
            </Switch>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
