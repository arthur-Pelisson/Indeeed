import React from 'react';
import {Button, Navbar} from "react-bootstrap";
import Login from "./Connexion/login";
import Register from "./Connexion/register";
import Cookies from 'js-cookie';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import {
    Link
} from "react-router-dom";

class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.handler = this.handler.bind(this);
        this.disconnected = this.disconnected.bind(this);

        this.state = {
            connected: false
        }

        if (Cookies.get("Token"))
            this.state.connected = true;
    }

    handler() {
        this.setState({
            connected: true
        })
    }

    disconnected() {
        this.setState({
            connected: false
        })
        Cookies.remove("Token");
    }

    render() {
        if (this.state.connected) {
            return (
                <Navbar bg="light">
                    <Navbar.Brand><Link to="/">JobBoard</Link></Navbar.Brand>
                    <div className={"ml-auto"}>
                        <Link to="/Profile">
                            <Button variant="light" onClick={this.handleShow}>
                                <FontAwesomeIcon icon={faUser}/>
                            </Button>
                        </Link>

                        <Button variant="light" onClick={this.disconnected}>
                            <FontAwesomeIcon icon={faSignOutAlt} color={"red"}/>
                        </Button>
                    </div>
                </Navbar>
            );
        } else {
            return (
                <Navbar bg="light">
                    <Navbar.Brand></Navbar.Brand>
                    <Navbar.Brand className={"ml-auto"}>
                        <Register/>
                        <Login handler={this.handler}/>
                    </Navbar.Brand>
                </Navbar>
            );
        }

    }
}

export default NavigationBar;