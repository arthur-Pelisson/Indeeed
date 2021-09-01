import React, {Component} from 'react';
import {Card, Container, Row, Col, Button} from "react-bootstrap";
import Cookies from 'js-cookie';
import ModifyProfile from './Component/Modify/modifyProfile';
import CreateAdvertisement from './Component/createAdvertisement';

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
            .then(result => {
                this.setState({data: JSON.parse(result)})
                console.log(this.state.data)
            })
            .catch(error => console.log('error', error));
    }

    componentDidMount(){
        this.fetchData();
    }

    avertisements(data) {
        if(this.state.data.profile.nomRoles === 'Utilisateur'){
            return (
                <Card key={data.id} className={"cardAnnonces"}>
                    <Card.Header>{data.titre}</Card.Header>
                    <Card.Body>
                        <Card.Title>{data.lieu} - {data.salaire.toString()} € par mois
                            - {data.temps_de_travail} h/Semaine</Card.Title>
                        <Card.Text>
                            {data.resume}
                        </Card.Text>
                    </Card.Body>
                </Card>
            );
        } else {
            return (
                <Card key={data.id} className={"cardAnnonces"}>
                    <Card.Header><Row><Col>{data.titre}</Col><Col md={{ span: 5, offset: 3}}><Button variant="danger">modifier</Button><Button variant="link">supprimer</Button></Col></Row></Card.Header>
                    <Card.Body>
                        <Card.Title>{data.lieu} - {data.salaire.toString()} € par mois
                            - {data.temps_de_travail} h/Semaine</Card.Title>
                        <Card.Text>
                            {data.resume}
                        </Card.Text>
                    </Card.Body>
                </Card>
            );
        }
    }

    render() {
        if(!this.state.data){
            return (
            <div></div>
                );
        }
            return (
                <Container>
                    <Row>
                        <Col md={5}>
                            <Card className="text-center">
                                <Card.Header><Row><Col md={4}><Card.Title>{this.state.data.profile.nomRoles}</Card.Title></Col><Col md={{ span: 5, offset: 3}}><ModifyProfile data={this.state.data.profile}/></Col></Row></Card.Header>
                                <Card.Body>
                                    <Card.Title>{this.state.data.profile.nom} {this.state.data.profile.prenom}</Card.Title>
                                    <Card.Text>Email: {this.state.data.profile.email}</Card.Text>
                                    <Card.Text>Télephone: {this.state.data.profile.telephone}</Card.Text>
                                </Card.Body>
                                <Card.Footer className="text-muted">Profile Page</Card.Footer>
                            </Card>
                        </Col>
                        <Col md={7}>
                            <Row>
                            {this.state.data.advertisement ? (this.state.data.advertisement.map(element => this.avertisements(element))):<Card></Card>}
                            </Row>
                        </Col>
                    </Row>
                </Container>
            );
    

    }
}

export default Profile;