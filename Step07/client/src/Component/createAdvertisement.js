import React, {Component} from 'react';
import {Form, Modal, Button} from "react-bootstrap";

class CreateAdvertisement extends Component {
    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,
            data: {
                titre: "",
                texte: "",
                salaire: "",
                lieu: "",
                temps_de_travail: "",
                resume: "",
                fk_entreprise_id: "",
            }
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
            <Button variant="outline-success" onClick={this.handleShow}>Ajouter une annonce</Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Form validated={this.state.validated} onSubmit={this.submitForm}>
                        <Modal.Header closeButton>
                            <Modal.Title>Ajouter une annonce</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
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
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onChange={this.handleInputChange} type="submit">
                                Poster l'annonce
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </>
        )
    }

    handleInputChange = e =>
    this.setState({
        data: {...this.state.data, [e.target.name]: e.target.value}
    });

    submitForm = e => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity()) {
            console.log(this.state.data);
            this.handleClose();
        } else {
            this.setState({validated: false});
        }
    }

}

export default CreateAdvertisement;