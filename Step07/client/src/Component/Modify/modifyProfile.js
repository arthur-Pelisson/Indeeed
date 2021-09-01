import React from 'react';
import {Button, Modal, Form, Row, Col} from "react-bootstrap";
import Cookies from 'js-cookie';

class ModifyProfile extends React.Component {
    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            data: props.data,
            show: false,
            values: {
                nomControl: this.props.data.nom,
                prenomControl: this.props.data.prenom,
                emailControl: this.props.data.email,
                telephoneControl: this.props.data.telephone,
                motdepasseControl: this.props.data.password
            },
            isSubmitting: false,
            isError: false,
            validated: false
        }
    }

    handleClose() {
        this.setState({show: false});
    }

    handleShow() {
        this.setState({show: true});
    }

    render(){
        return(
            <>
                <Button variant="link" onClick={this.handleShow}>
                    Modifier le profile
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Form validated={this.state.validated} onSubmit={this.submitForm}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modifier son profile</Modal.Title>
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
                                <Form.Label>Mot de passe (laisser vide si vous ne souhaitez pas modifier)</Form.Label>
                                <Form.Control
                                    type={"password"}
                                    name="motdepasseControl"
                                    id="motdepasseControl"
                                    onChange={this.handleInputChange}
                                    value={this.state.values.password}/>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onChange={this.handleInputChange} type="submit">
                                Modifier son profil
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

    refreshPage = e => {
        window.location.reload(false);
    }

    submitForm = e => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity()) {
            console.log(this.state);
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("x-access-token", Cookies.get("Token"));

            var raw = JSON.stringify({
                    "email": this.state.values.emailControl === "" ? this.props.data.email : this.state.values.emailControl,
                    "password": this.state.values.motdepasseControl === "" ? this.props.data.password : this.state.values.motdepasseControl,
                    "telephone": this.state.values.telephoneControl === "" ? this.props.data.telephone : this.state.values.telephoneControl,
                    "nom": this.state.values.nomControl === "" ? this.props.data.nom : this.state.values.nomControl,
                    "prenom": this.state.values.prenomControl === "" ? this.props.data.prenom : this.state.values.prenomControl,
                    "fk_role_id": this.state.values.fk_role_id === "" ? this.props.data.fk_role_id : this.props.data.fk_role_id
                }
            );
            console.log(raw);

            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("http://localhost:9000/profile", requestOptions)
                .then(response => response.text())
                .then(result => this.refreshPage())
                .catch(error => console.log('error', error));
            this.handleClose();
        } else {
            this.setState({validated: false});
        }
    }
}

export default ModifyProfile;