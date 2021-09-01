import React, {Component} from 'react';
import './App.css';
import {Card, Button, Container, Row, Col} from "react-bootstrap";
import ReactDOM from 'react-dom';
import axios from 'axios';

const cards = [
    {
        id: 1,
        titre: 'Développeur Web',
        texte: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a erat non arcu tincidunt viverra. Cras non sem aliquam, euismod augue a, vulputate erat. Maecenas auctor, justo nec dignissim scelerisque, velit lorem volutpat mauris, eget consectetur elit risus eu augue. Cras vehicula consequat semper. Morbi euismod consequat pellentesque. Praesent in purus tortor. Aenean non diam mollis, tempus risus ac, laoreet elit. Cras placerat quis nibh et tempor. Nulla felis justo, faucibus sed scelerisque non, hendrerit at neque. Donec ac lobortis magna. Nunc imperdiet a est ac pellentesque. Duis id congue elit. Nam mi ipsum, imperdiet ut ipsum id, ullamcorper pulvinar lorem.',
        salaire: 1500,
        lieu: 'Lyon (69)',
        temps_de_travail: '35',
        resume: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a erat non arcu tincidunt viverra.',
        date: '30 septembre 2020'
    },
    {
        id: 2,
        titre: 'Développeur FullStack',
        texte: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a erat non arcu tincidunt viverra. Cras non sem aliquam, euismod augue a, vulputate erat. Maecenas auctor, justo nec dignissim scelerisque, velit lorem volutpat mauris, eget consectetur elit risus eu augue. Cras vehicula consequat semper. Morbi euismod consequat pellentesque. Praesent in purus tortor. Aenean non diam mollis, tempus risus ac, laoreet elit. Cras placerat quis nibh et tempor. Nulla felis justo, faucibus sed scelerisque non, hendrerit at neque. Donec ac lobortis magna. Nunc imperdiet a est ac pellentesque. Duis id congue elit. Nam mi ipsum, imperdiet ut ipsum id, ullamcorper pulvinar lorem.',
        salaire: 1500,
        lieu: 'Lyon (69)',
        temps_de_travail: '30',
        resume: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a erat non arcu tincidunt viverra.',
        date: '30 septembre 2020'
    },
    {
        id: 3,
        titre: 'Développeur Mobile',
        texte: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a erat non arcu tincidunt viverra. Cras non sem aliquam, euismod augue a, vulputate erat. Maecenas auctor, justo nec dignissim scelerisque, velit lorem volutpat mauris, eget consectetur elit risus eu augue. Cras vehicula consequat semper. Morbi euismod consequat pellentesque. Praesent in purus tortor. Aenean non diam mollis, tempus risus ac, laoreet elit. Cras placerat quis nibh et tempor. Nulla felis justo, faucibus sed scelerisque non, hendrerit at neque. Donec ac lobortis magna. Nunc imperdiet a est ac pellentesque. Duis id congue elit. Nam mi ipsum, imperdiet ut ipsum id, ullamcorper pulvinar lorem.',
        salaire: 1500,
        lieu: 'Lyon (69)',
        temps_de_travail: '20',
        resume: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a erat non arcu tincidunt viverra.',
        date: '30 septembre 2020'
    },
    {
        id: 4,
        titre: 'Ingénieur réseau',
        texte: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a erat non arcu tincidunt viverra. Cras non sem aliquam, euismod augue a, vulputate erat. Maecenas auctor, justo nec dignissim scelerisque, velit lorem volutpat mauris, eget consectetur elit risus eu augue. Cras vehicula consequat semper. Morbi euismod consequat pellentesque. Praesent in purus tortor. Aenean non diam mollis, tempus risus ac, laoreet elit. Cras placerat quis nibh et tempor. Nulla felis justo, faucibus sed scelerisque non, hendrerit at neque. Donec ac lobortis magna. Nunc imperdiet a est ac pellentesque. Duis id congue elit. Nam mi ipsum, imperdiet ut ipsum id, ullamcorper pulvinar lorem.',
        salaire: 1500,
        lieu: 'Lyon (69)',
        temps_de_travail: '15',
        resume: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a erat non arcu tincidunt viverra.',
        date: '30 septembre 2020'
    }
];


let annonce;

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
                    <Card.Title>{data.lieu} - {data.salaire.toString()} € par mois
                        - {data.temps_de_travail} h/Semaine</Card.Title>
                    <Card.Text>
                        {data.resume}
                    </Card.Text>
                    <Button onClick={() => {
                        annonce = data;
                        ReactDOM.unmountComponentAtNode(document.getElementById("annonceCol"));
                        ReactDOM.render(<Annonce/>, document.getElementById("annonceCol"));
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
        const {data} = this.state;
        return (
            <Container>
                <Row>
                    <Col md={5}>
                        {this.state.avertisements.map(data => this.avertisements(data))}
                    </Col>
                    <Col md={7} id="annonceCol">
                    </Col>
                </Row>
            </Container>
        );
    };
}

export default App;

class Annonce extends React.Component {
    constructor(data) {
        super(data);
        this.annonce = annonce;

    }

    render() {
        return (
            <Card key={this.annonce.id} className={"cardAnnonce"}>
                <Card.Header>{this.annonce.titre}</Card.Header>
                <Card.Body className={"overflowCard"}>
                    <Card.Title>{this.annonce.lieu} - {this.annonce.salaire.toString()} € par mois
                        - {this.annonce.temps_de_travail} h/Semaine</Card.Title>
                    <Card.Text>
                        {this.annonce.texte}
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
}