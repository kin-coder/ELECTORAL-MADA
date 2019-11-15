import React, { Component } from 'react';
import BASE_URL from '../../cinfig';
import axios from 'axios';
import { Form, Collapse } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

class Sondages extends Component {
    state = {
        first_name : "",
        last_name : "",
        cin : "",
        open_add : false
    }
    
    constructor(props, context) {
        super(props, context);  
        this.handleSubmit = this.handleSubmit.bind(this);             
    }


    componentDidMount() {
        
    }

    handleSubmit = e => {
        e.preventDefault();
        
    }

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
          });
        };
    
    render() {
        const { open_add } = this.state;
        return (
            <div className="px-5 py-5 mx-lg-5 mx-md-5 mx-2 bg-light my-5">
                <h1 className="font-weight-light mb-5">
                    Listes des Sondages /&nbsp;
                    <button onClick={() => this.setState({ open_add: !open_add })} aria-expanded={open_add} className="btn btn-outline-primary">
                        Ajouter Sondages
                    </button>
                </h1>
                <div className="col-md-12 col-12">
                    <Collapse in={this.state.open_add}>
                        <form className="form-create">
                            <div className="form-label-group mb-5">
                                <Form.Control disabled type="text" name="cin" id="inputCin" onChange={ this.handleInputChange } value={ this.state.cin } className="form-control" placeholder="CIN" required />
                                <label htmlFor="inputCIN">CIN after QR</label>
                            </div>
                            <div className="form-label-group mb-5">
                                <Form.Control type="text" name="first_name" id="inputFirst_name" onChange={ this.handleInputChange } value={ this.state.first_name } className="form-control" placeholder="Prénom" required autoFocus />
                                <label htmlFor="inputFirst_name">Comment</label>
                            </div>
                            <div className="form-label-group mb-5">
                                <Form.Control type="file" name="last_name" id="inputLast_name" onChange={ this.handleInputChange } value={ this.state.last_name } className="form-control" placeholder="Nom" required />
                                <label htmlFor="inputLast_name">File</label>
                            </div>
                            <div className="text-right">
                                <button className="btn btn-secondary" type="submit">Valider</button>
                            </div>
                        </form>
                    </Collapse>
                    <table className="table">
                        <caption>List of Sondages</caption>
                        <thead>
                            <tr>
                            <th scope="col">CIN</th>
                            <th scope="col">First</th>
                            <th scope="col">Comment</th>
                            <th scope="col">File</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            </tr>
                            <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            </tr>
                            <tr>
                            <th scope="row">3</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Sondages