import React, {Component} from 'react';
import './App.css';
import {Card, Button, Container, Row, Col} from "react-bootstrap";
import ReactDOM from 'react-dom';
import ApplyPost from './Component/applyPost/applyPost';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            avertisements: [],
        }
    }

    avertisements(data) {
        return (
            <Card key={data.id} className={"cardAnnonces"}>
                <Card.Header>{data.titre}</Card.Header>
                <Card.Body>
                    <Card.Title>{data.lieu} - {data.salaire.toString()} € par mois - {data.temps_de_travail} h/Semaine</Card.Title>
                    <Card.Text>
                        {data.resume}
                    </Card.Text>
                    <Button onClick={() => {
                        ReactDOM.unmountComponentAtNode(document.getElementById("annonceCol"));
                        ReactDOM.render(<Annonce data={data}/>, document.getElementById("annonceCol"));
                    }} variant="primary">Learn more</Button>
                </Card.Body>
            </Card>
        );
    }

    componentDidMount() {
        fetch("http://localhost:9000/advertisements", {
            method: "get",
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({avertisements: data});
            });
    }

    render() {
        return (
            <>
                <Container>
                    <Row>
                        <Col md={5}>
                            {this.state.avertisements.map(data => this.avertisements(data))}
                        </Col>
                        <Col md={7} id="annonceCol">
                        </Col>
                    </Row>
                </Container>
            </>
        );
    };
}

export default App;

class Annonce extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: props.data};
    }

    render() {
        return (
            <Card key={this.state.data.id} className={"cardAnnonce"}>
                <Card.Header>{this.state.data.titre}</Card.Header>
                <Card.Body className={"overflowCard"}>
                    <Card.Title>{this.state.data.lieu} - {this.state.data.salaire.toString()} € par mois
                        - {this.state.data.temps_de_travail} h/Semaine</Card.Title>
                    <Card.Text>
                        {this.state.data.texte}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <ApplyPost data={this.state.data}/>
                </Card.Footer>
            </Card>
        );
    }
}
