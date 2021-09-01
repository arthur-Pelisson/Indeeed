import React from 'react';
import {Button, Navbar} from "react-bootstrap";
import Login from "./Connexion/login";
import Register from "./Connexion/register";
import Cookies from 'js-cookie';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faSignOutAlt, faUserCog} from '@fortawesome/free-solid-svg-icons';
import {
    Link
} from "react-router-dom";

class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.handler = this.handler.bind(this);
        this.disconnected = this.disconnected.bind(this);

        this.state = {
            connected: false,
            data: ""
        }
    }

    fetchData = () => {
        if(Cookies.get("Token")){
            var myHeaders = new Headers();
            myHeaders.append("x-access-token", Cookies.get("Token"));

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch("http://localhost:9000/profile", requestOptions)
                .then(response => response.text())
                .then(result => {
                    this.setState({
                        data: JSON.parse(result),
                        connected: true
                    })
                })
                .catch(error => console.log('error', error));
            }
    }

    componentDidMount(){
        this.fetchData();
    }

    handler() {
        this.setState({
            connected: true
        });
        this.componentDidMount();
    }

    disconnected() {
        this.setState({connected: false});
        this.setState({data: ""});
        Cookies.remove("Token");
    }

    render() {
        console.log(this.state);
        if(this.state.connected === true){
            if (this.state.data.profile) {
                var link;
                if(this.state.data.profile.nomRoles==="Utilisateur"){
                    link = <Link to="/Profile">
                                <Button variant="light" onClick={this.handleShow}>
                                    <FontAwesomeIcon icon={faUser}/>
                                </Button>
                            </Link>
                } else if(this.state.data.profile.nomRoles==="Entreprise"){
                    link = <Link to="/Dashboard">
                                <Button variant="light" onClick={this.handleShow}>
                                    <FontAwesomeIcon icon={faUserCog}/>
                                </Button>
                            </Link>
                }
                return(
                    <Navbar bg="light">
                        <Navbar.Brand><Link to="/">JobBoard</Link></Navbar.Brand>
                        <div className={"ml-auto"}>
                            {link}
                            <Button variant="light" onClick={this.disconnected}>
                                <FontAwesomeIcon icon={faSignOutAlt} color={"red"}/>
                            </Button>
                        </div>
                    </Navbar>
                );
            } else {
                return (<div></div>)
            }
        } else {
            return(
                <Navbar bg="light">
                    <Navbar.Brand><Link to="/">JobBoard</Link></Navbar.Brand>
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