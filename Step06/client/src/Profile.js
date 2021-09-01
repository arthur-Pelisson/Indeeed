import React, {Component} from 'react';
import {Card, Container, Row, Col} from "react-bootstrap";
import Cookies from 'js-cookie';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: ""
        }
    }

    fetchData = () => {
        var myHeaders = new Headers();
        myHeaders.append("x-access-token", Cookies.get("Token"));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:9000/profile", requestOptions)
            .then(response => response.text())
            .then(result => this.setState({data: JSON.parse(result)}))
            .catch(error => console.log('error', error));
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col md={5}>
                        <Card className="text-center">
                            <Card.Header>{this.state.data.id}</Card.Header>
                            <Card.Body>
                                <Card.Title>{this.state.data.nom} {this.state.data.prenom}</Card.Title>
                                <Card.Text>Email: {this.state.data.email}</Card.Text>
                                <Card.Text>Télephone: {this.state.data.telephone}</Card.Text>
                            </Card.Body>
                            <Card.Footer className="text-muted">Profile Page</Card.Footer>
                        </Card>
                    </Col>
                    <Col md={7}>
                        <Card className="text-center">
                            <Card.Body>
                                <Card.Title>Nom entreprise</Card.Title>
                                <Card.Text>Poste</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Profile;