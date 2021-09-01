import React, {Component} from 'react';
import {Form, Container, Button, Row, Col, Table,Alert} from "react-bootstrap";
import Cookies from 'js-cookie';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            validated: false,
            data: {
                titre: "",
                texte: "",
                salaire: "",
                lieu: "",
                temps_de_travail: "",
                resume: "",
                fk_entreprise_id: "",
            },
            advertisements: "",
            advData: [],
            success: false
        }
    }

    getAdvertisements() {
        var array = []
        if(this.state.advertisements.advertisement){
            this.state.advertisements.advertisement.map(data => {
                array.push( 
                    <tr>
                        <td>{data.id}</td>
                        <td>{data.titre}</td>
                        <td>{data.lieu}</td>
                        <td>{data.salaire}</td>
                        <td><Button variant={"link"}>Modifier</Button></td>
                        <td><Button onClick={() => this.deleteAdv(data.id)} variant={"link"}>Supprimer</Button></td>
                    </tr>
                );
            })
        }
        return array;
    }

    componentDidMount(){
        this.getData();
    }


    render() {
        var success;
        if(this.state.success){
            success = <Alert variant="success">
                        L'annonce a été ajouté avec succès !
                    </Alert>;
        }
        return (
            <Container>
                <Row>
                    <Col md={4}>
                        {success}
                        <Form validated={this.state.validated} onSubmit={this.submitForm}>
                            <h2>Ajouter une annonce</h2>
                            <Form.Group>
                                <Form.Label>Titre</Form.Label>
                                <Form.Control
                                    required
                                    name="titre"
                                    id="titre"
                                    value={this.state.data.titre}
                                    onChange={this.handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Lieu</Form.Label>
                                <Form.Control
                                    required
                                    name="lieu"
                                    id="lieu"
                                    onChange={this.handleInputChange}
                                    value={this.state.data.lieu}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Courte description</Form.Label>
                                <Form.Control
                                    required
                                    name="resume"
                                    id="resume"
                                    as="textarea"
                                    rows="4"
                                    maxLength="200"
                                    onChange={this.handleInputChange}
                                    value={this.state.data.resume}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Texte</Form.Label>
                                <Form.Control
                                    required
                                    name="texte"
                                    id="texte"
                                    as="textarea"
                                    rows="8"
                                    onChange={this.handleInputChange}
                                    value={this.state.data.texte}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Salaire par mois</Form.Label>
                                <Form.Control
                                    required
                                    name="salaire"
                                    id="salaire"
                                    onChange={this.handleInputChange}
                                    value={this.state.data.salaire} 
                                    type="number"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Temps de travail par semaine</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    name="temps_de_travail"
                                    id="temps_de_travail"
                                    onChange={this.handleInputChange}
                                    value={this.state.data.temps_de_travail}/>
                            </Form.Group>
                            <Button variant="primary" onChange={this.handleInputChange} type="submit">
                                Poster l'annonce
                            </Button>
                        </Form>
                    </Col>
                    <Col md={8}>
                        <Table striped bordered hover size="sm" className={"text-center"}>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Titre</th>
                                <th>Lieu</th>
                                <th>Salaire</th>
                                <th></th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.advertisements != "" ?
                                this.getAdvertisements()
                                :
                                <tr></tr>
                            }
                            </tbody>
                        </Table>
                    </Col>
                </Row>


            </Container>
        )
    }

    handleInputChange = e =>
    this.setState({
        data: {...this.state.data, [e.target.name]: e.target.value}
    });

    getData = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("x-access-token", Cookies.get("Token"));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:9000/profile", requestOptions)
            .then(response => response.text())
            .then(result => this.setState({advertisements: JSON.parse(result)}))
            .catch(error => console.log('error', error));  
    }

    deleteAdv = (id) => {
        var myHeaders = new Headers();
        myHeaders.append("x-access-token", Cookies.get("Token"));

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:9000/advertisements/"+id, requestOptions)
        this.getData();
        this.forceUpdate();
    }

    submitForm = e => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity()) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("x-access-token", Cookies.get("Token"));

            var raw = JSON.stringify({
                    "titre": this.state.data.titre,
                    "texte": this.state.data.texte,
                    "salaire": this.state.data.salaire,
                    "lieu": this.state.data.lieu,
                    "temps_de_travail": this.state.data.temps_de_travail,
                    "resume": this.state.data.resume
                }
            );

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("http://localhost:9000/advertisements", requestOptions)
            .then(this.getData())
        } else {
            this.setState({validated: false});
        }
    }
}

export default Dashboard;