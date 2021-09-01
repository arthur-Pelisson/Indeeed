import React from 'react';
import {Button, Modal, Form} from "react-bootstrap";
import Register from "./register";
import Cookies from 'js-cookie';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            data: props.data,
            show: false,
            values: {
                emailControl: "",
                motdepasseControl: ""
            }
        }
    }

    handleClose() {
        this.setState({show: false});
    }

    handleShow() {
        this.setState({show: true});
    }

    render() {
        return (
            <>
                <Button variant="primary" onClick={this.handleShow}>
                    Se connecter
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Form validated={this.state.validated} onSubmit={this.submitForm}>
                        <Modal.Header closeButton>
                            <Modal.Title>Se connecter</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    required
                                    name="emailControl"
                                    id="emailControl"
                                    onChange={this.handleInputChange}
                                    value={this.state.values.emailControl}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Mot de passe</Form.Label>
                                <Form.Control
                                    required
                                    name="motdepasseControl"
                                    id="motdepasseControl"
                                    onChange={this.handleInputChange}
                                    value={this.state.values.motdepasseControl}/>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Register/>
                            <Button variant="primary" onChange={this.handleInputChange} type="submit">
                                Se connecter
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
            console.log(this.state.values);
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify(
                {
                    "email": this.state.values.emailControl,
                    "password": this.state.values.motdepasseControl
                }
            );

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("http://localhost:9000/login", requestOptions)
                .then(response => response.text())
                .then(result => {
                    let temp = JSON.parse(result);
                    if(temp){
                        Cookies.set("Token",temp.data.token);
                        this.props.handler();
                    }
                })
                .catch(error => console.log('error', error));
        } else {
            this.setState({validated: false});
        }
    }

}

export default Login;