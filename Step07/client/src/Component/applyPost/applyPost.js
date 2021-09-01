import React from 'react';
import {Button, Modal, Form, Row, Col} from "react-bootstrap";
import Cookies from 'js-cookie';

class ApplyPost extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            data: props.data,
            show: false,
            dataProfile: "",
            values: {
                nomControl: "",
                prenomControl: "",
                emailControl: "",
                telephoneControl: "",
                messageControl: ""
            },
            isSubmitting: false,
            isError: false,
            validated: false
        };
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
                this.setState({dataProfile: JSON.parse(result)})
            }).catch(e => {
                this.errorMsg = e.message;
        })
    }

    handleClose() {
        this.setState({show: false});
    }

    handleShow() {
        this.setState({show: true});
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        if (!Cookies.get("Token")) {
            return (
                <>
                    <Button variant="primary" onClick={this.handleShow}>
                        Postuler
                    </Button>

                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Form validated={this.state.validated} onSubmit={this.submitForm}>
                            <Modal.Header closeButton>
                                <Modal.Title>{this.state.data.titre}</Modal.Title>
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
                                            <Form.Label>Prenom</Form.Label>
                                            <Form.Control
                                                required
                                                name="prenomControl"
                                                id="prenomControl"
                                                value={this.state.values.prenomControl}
                                                onChange={this.handleInputChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
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
                                    <Form.Label>Message</Form.Label>
                                    <Form.Control
                                        required
                                        name="messageControl"
                                        id="messageControl"
                                        onChange={this.handleInputChange}
                                        value={this.state.values.messageControl} as="textarea"
                                        rows="4"/>
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" onChange={this.handleInputChange} type="submit">
                                    Envoyer
                                </Button>
                            </Modal.Footer>
                        </Form>
                    </Modal>
                </>
            );
        } else {
            return (
                <>
                    <Button variant="primary" onClick={this.handleShow}>
                        Postuler
                    </Button>

                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Form validated={this.state.validated} onSubmit={this.submitForm}>
                            <Modal.Header closeButton>
                                <Modal.Title>{this.state.data.titre}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form.Group>
                                    <Form.Label>Message</Form.Label>
                                    <Form.Control
                                        required
                                        name="messageControl"
                                        id="messageControl"
                                        onChange={this.handleInputChange}
                                        value={this.state.values.messageControl} as="textarea"
                                        rows="4"/>
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" onChange={this.handleInputChange} type="submit">
                                    Envoyer
                                </Button>
                            </Modal.Footer>
                        </Form>
                    </Modal>
                </>
            );
        }

    }

    handleInputChange = e => {
        this.setState({
            values: {...this.state.values, [e.target.name]: e.target.value}
        });
    }

    submitForm = e => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity()) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("x-access-token", Cookies.get("Token"));

            var raw;
            if(this.state.dataProfile.data){
                myHeaders.append("x-access-token", Cookies.get("Token"));
                 raw = JSON.stringify({
                    "texte": this.state.values.messageControl,
                    "fk_advertisement_id": this.state.data.id,
                    "nom": this.state.dataProfile.profile.nom,
                    "prenom": this.state.dataProfile.profile.prenom,
                    "email": this.state.dataProfile.profile.email,
                    "telephone": this.state.dataProfile.profile.telephone
                });
            } else {
                raw = JSON.stringify({
                    "texte": this.state.values.messageControl,                    
                    "fk_advertisement_id": this.state.data.id,
                    "nom": this.state.values.nomControl,
                    "prenom": this.state.values.prenomControl,
                    "email": this.state.values.emailControl,
                    "telephone": this.state.values.telephoneControl
                });
            }


            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            fetch("http://localhost:9000/informations", requestOptions)
                .catch(error => console.log('error', error));
            this.handleClose();
        } else {
            this.setState({validated: false});
        }
    }
}

export default ApplyPost;