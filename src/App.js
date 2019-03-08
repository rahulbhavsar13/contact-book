import React, { Component } from 'react';
import logo from './logo.svg';
import { Row, Col, PanelGroup, Panel, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import './assets/App.scss';
import ContactList from './contact-list';


class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>
                        Contact-Book
                    </h1>
                </header>
                <section>
                    <ContactList />
                </section>
            </div>
        );
    }
}

export default App;