import React from 'react';
import {Button, Modal, Form, Row, Col, ToggleButton, ToggleButtonGroup } from "react-bootstrap";

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = (val) => this.setState({"value": val});

        this.state = {
            data: props.data,
            show: false,
            values: {
                nomControl: "",
                prenomControl: "",
                emailControl: "",
                telephoneControl: "",
                motdepasseControl: "",
                entrepriseControl: ""
            },
            isSubmitting: false,
            isError: false,
            validated: false,
            value: 3
        }
    }


    handleClose() {
        this.setState({show: false});
    }

    handleShow() {
        this.setState({show: true});
    }

    render() {
        const role = this.state.value;
        let input;
        if(role===2){
            input = <Form.Group>
            <Form.Label>Nom de l'entreprise</Form.Label>
            <Form.Control
                required
                name="entrepriseControl"
                id="entrepriseControl"
                onChange={this.handleInputChange}
                value={this.state.values.entrepriseControl}
            />
        </Form.Group>;
        }

        return (
            <>
                <Button variant="light" onClick={this.handleShow}>
                    S'inscrire
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Form validated={this.state.validated} onSubmit={this.submitForm}>
                        <Modal.Header closeButton>
                            <Modal.Title>S'inscrire</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Nom</Form.Label>
                                        <Form.Control
                                            required
                                            name="nomControl"
                                            id="nomControl"
                                            value={this.state.values.nomControl}
                                            onChange={this.handleInputChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Prénom</Form.Label>
                                        <Form.Control
                                            required
                                            name="prenomControl"
                                            id="prenomControl"
                                            onChange={this.handleInputChange}
                                            value={this.state.values.prenomControl}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group>
                                <Form.Label>Téléphone</Form.Label>
                                <Form.Control
                                    required
                                    name="telephoneControl"
                                    id="telephoneControl"
                                    onChange={this.handleInputChange}
                                    value={this.state.values.telephoneControl}
                                    type="phone"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Adresse mail</Form.Label>
                                <Form.Control
                                    required
                                    name="emailControl"
                                    id="emailControl"
                                    onChange={this.handleInputChange}
                                    value={this.state.values.emailControl} type="email"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Mot de passe</Form.Label>
                                <Form.Control
                                    required
                                    type={"password"}
                                    name="motdepasseControl"
                                    id="motdepasseControl"
                                    onChange={this.handleInputChange}
                                    value={this.state.values.motdepasseControl}/>
                            </Form.Group>
                            <Form.Group>
                                <ToggleButtonGroup type="radio" name="role" value={this.state.value} onChange={this.handleChange}>
                                    <ToggleButton value={3}>Utilisateur</ToggleButton>
                                    <ToggleButton value={2}>Entreprise</ToggleButton>
                                </ToggleButtonGroup>
                            </Form.Group>
                            {input}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onChange={this.handleInputChange} type="submit">
                                S'inscrire
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </>
        );
    }

    handleInputChange = e =>
        this.setState({
            values: {...this.state.values, [e.target.name]: e.target.value}
        });

    submitForm = e => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity()) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                    "email": this.state.values.emailControl,
                    "password": this.state.values.motdepasseControl,
                    "telephone": this.state.values.telephoneControl,
                    "nom": this.state.values.nomControl,
                    "prenom": this.state.values.prenomControl,
                    "fk_role_id": this.state.value
                }
            );



            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("http://localhost:9000/register", requestOptions)
                .then(response => response.text())
                .then(result => JSON.parse(result))
                .then(res => {
                    if(this.state.value===2){
                        var myHeaders = new Headers();
                        myHeaders.append("Content-Type", "application/json");
        
                        var raw = JSON.stringify({
                                "nom": this.state.values.entrepriseControl,
                                "fk_people_id": res.id
                            }
                        );
        
                        var requestOptions = {
                            method: 'POST',
                            headers: myHeaders,
                            body: raw,
                            redirect: 'follow'
                        };
        
                        fetch("http://localhost:9000/companies", requestOptions)
                        .catch(error => console.log('error', error));            
                    }
                })
                .catch(error => console.log('error', error));            
            this.handleClose();
        } else {
            this.setState({validated: false});
        }
    }
}

export default Register;