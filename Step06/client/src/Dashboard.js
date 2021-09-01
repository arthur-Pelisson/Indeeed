import React, {Component} from 'react';
import {Card, Container, Button, Row, Col, Table} from "react-bootstrap";
import Cookies from 'js-cookie';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }




    render() {
        return (
            <Container>
                <Table striped bordered hover size="sm" className={"text-center"}>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Nom Prénom</th>
                        <th>Entreprise</th>
                        <th>Titre du poste</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>Robin Marquet</td>
                        <td>Epitech</td>
                        <td>Développeur Web</td>
                        <td><Button variant={"link"}>Modifier</Button></td>
                        <td><Button variant={"link"}>Supprimer</Button></td>
                    </tr>
                    </tbody>
                </Table>
            </Container>
        )
    }
}

export default Dashboard;