import React, { Component } from 'react';
import BASE_URL from '../../../cinfig';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
class Dashboard extends Component {
    state = {
        voters: [],
        results_voters: [],
        find: "",
    }

    constructor(props, context) {
        super(props, context);
        this.handleCheck = this.handleCheck.bind(this);        

    }

    componentDidMount() {
        setTimeout(() => {
            if("token" in localStorage) {
                const Authorization = localStorage.getItem('token');
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': Authorization,
                };
    
                axios.get(`${BASE_URL}/api/voters/`, { headers })
                    .then(res => {
                        const voters = res.data;
                        this.setState({ voters: voters });
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        }, 2000);
    }

    handleInputChange = e => {
        this.setState({
          [e.target.name]: e.target.value
        });

        const Authorization = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': Authorization,
        };
        axios.get(`${BASE_URL}/api/voters/${e.target.value}`, { headers })
            .then(res => {
                const results_voters = res.data;
                this.setState({ results_voters: results_voters });
            })
            .catch(error => {
                console.log(error);
            });
      };

      handleCheck = (cin) => e => {
        this.setState({
            find : cin
        });

        console.log(this.state.find)
      } 
    
    render() {
        return (

            <div className="mx-lg-5 mx-md-5 mx-2">
                <div className="card border-0 shadow my-5">
                    <div className="card-body p-5">
                    <h1 className="font-weight-light mb-5">Liste des Electeurs</h1>
                    <div className="form-label-group">
                        <Form.Control type="text" name="find" id="inputPassword" onChange={ this.handleInputChange } value={ this.state.find } className="form-control" placeholder="Rechercher ..." />
                        <label htmlFor="inputPassword">Rechercher ...</label>
                    </div>
                    <div className="table-responsive">

                    
                    <table className="table table-borderless">
                        <thead>
                            <tr>
                            <th scope="col">CIN</th>
                            <th scope="col">NOM</th>
                            <th scope="col">Prénom</th>
                            <th scope="col"> - </th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            ( this.state.find === "" ) ? 

                            this.state.voters.map((voter, index) =>
                                <tr key={index}>
                                <th scope="row">{ voter.cin }</th>
                                <td>{ voter.last_name }</td>
                                <td>{ voter.first_name }</td>
                                <td>
                                    <div className="text-left">
                                        <button type="button" onClick={this.handleCheck(voter.cin)} className="btn btn-outline-primary">Check</button>
                                    </div>
                                </td>
                                </tr>
                            )
                            :
                            this.state.results_voters.map((voter, index) =>
                                <tr key={index}>
                                <th scope="row">{ voter.cin }</th>
                                <td>{ voter.last_name }</td>
                                <td>{ voter.first_name + voter._id.$oid}</td>
                                <td>                                    
                                    <div className="text-left">
                                        <button type="button" onClick={this.handleCheck(voter.cin)} className="btn btn-outline-primary">Check</button>
                                    </div>
                                </td>
                                </tr>
                            )
                        }
                        </tbody>
                        </table>
                        </div>
                    <div className="my-5"></div>
                    <p className="lead mb-0">You've reached the end!</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard