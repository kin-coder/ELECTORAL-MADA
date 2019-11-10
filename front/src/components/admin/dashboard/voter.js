import React, { Component } from 'react';
import BASE_URL from '../../../cinfig';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
class Voter extends Component {
    state = {
        candidats: [],
        results_voters: [],
        find: "",
    }

    // constructor(props, context) {
    //     super(props, context);
    //     this.handleCheck = this.handleCheck.bind(this);        

    // }

    // componentDidMount() {
    //     setTimeout(() => {
    //         if("token" in localStorage) {
    //             const Authorization = localStorage.getItem('token');
    //             const headers = {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': Authorization,
    //             };
    
    //             axios.get(`${BASE_URL}/api/voters/`, { headers })
    //                 .then(res => {
    //                     const voters = res.data;
    //                     this.setState({ voters: voters });
    //                 })
    //                 .catch(error => {
    //                     console.log(error);
    //                 });
    //         }
    //     }, 2000);
    // }

    // handleInputChange = e => {
    //     this.setState({
    //       [e.target.name]: e.target.value
    //     });

    //     const Authorization = localStorage.getItem('token');
    //     const headers = {
    //         'Content-Type': 'application/json',
    //         'Authorization': Authorization,
    //     };
    //     axios.get(`${BASE_URL}/api/voters/${e.target.value}`, { headers })
    //         .then(res => {
    //             const results_voters = res.data;
    //             this.setState({ results_voters: results_voters });
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    //   };

    //   handleCheck = (cin) => e => {
    //     this.setState({
    //         find : cin
    //     });

    //     console.log(this.state.find)
    //   } 
    
    render() {
        return (

        <section className="">
            
            <header class="text-center py-5 mb-4">
                <div class="container">
                    <h1 class="font-weight-light text-white">Choisir voter Candidat</h1>
                </div>
            </header>

            <div className="d-flex justify-content-center">
                
                <div class="col-md-10 col-10">
                    <div class="row">
                        <div class="col-xl-3 col-md-3 mb-4">
                            <div class="card border-0 shadow">
                                <img src="https://source.unsplash.com/TMgQMXoglsM/500x350" class="card-img-top" alt="..." />
                                <div class="card-body text-center">
                                    <h5 class="card-title mb-0">Team Member</h5>
                                    <div class="card-text text-black-50">Web Developer</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
        );
    }
}

export default Voter