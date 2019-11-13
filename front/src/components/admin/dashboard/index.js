import React, { Component } from 'react';
import BASE_URL from '../../../cinfig';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Modal, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaQrcode } from "react-icons/fa";
import QrReader from 'react-qr-reader'

class Dashboard extends Component {
    state = {
        voters: [],
        results_voters: [],
        session_vote: [],
        find: "",
        show: false,
        result_qr: "No result"
    }
    
    constructor(props, context) {
        super(props, context);
        this.handleCheck = this.handleCheck.bind(this);        
        
    }
    
    notifyError = () => {
        toast.warn("Isoloir Occupé", {
            position: toast.POSITION.TOP_CENTER
            });
    };
    notifyOK = () => {
        toast.info("l'électeur peut voter !", {
            position: toast.POSITION.TOP_CENTER
            });
    };

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

      handleCheck = (_id) => e => {

        if("token" in localStorage) {
            const Authorization = localStorage.getItem('token');
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': Authorization,
            };
            const email = localStorage.getItem('email');
            axios.post(`${BASE_URL}/api/session_vote/begin`, {email:email, voter:_id}, {headers} )
                .then( res  => {
                    if(res.data.session_vote.$oid){
                        this.notifyOK();
                    } else{
                        this.notifyError();
                    }
                })
                .catch(error => {
                    
                })
        }

      } 

      getSessionVote () {
        const Authorization = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': Authorization,
        };
        const email = localStorage.getItem('email');
        axios.get(`${BASE_URL}/api/session_vote/check`, { email }, { headers })
            .then(res => {
                
                if(res.session_vote_id){
                    // this.setState({
                    //     voters : [],
                    //     results_voters : []
                    // });
                    console.log(localStorage.getItem('token'));
                }
            })
            .catch(error => {
                console.log(error);
            });
        }

        handleScan = data => {
            const Authorization = localStorage.getItem('token');
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': Authorization,
            };
            if (data) {

                axios.get(`${BASE_URL}/api/voters/${data}`, { headers })
                    .then(res => {
                        const results_voters = res.data;
                        this.setState({ 
                            find : data,
                            results_voters: results_voters,
                            show : false,
                        });
                    })
                    .catch(error => {
                        console.log(error);
                    });

            }
        }

        handleError = err => {
            console.error(err)
        }
        
    
    render() {

        const handleClose = () => 
            this.setState({
                show: false
            });
        const handleShow = () => 
            this.setState({
                show: true
            });

        return (

            <div className="mx-lg-5 mx-md-5 mx-2">
                <div className="card border-0 shadow my-5">
                    <div className="card-body p-5">
                        <div className="d-flex justify-content-between  mb-5">
                            <h1 className="font-weight-light">
                                Liste des Electeurs / &nbsp;
                                <Link className="btn btn-outline-primary" to="/dashboard/ajouterElecteur">Ajouter Electeur</Link>
                            </h1>

                            <button className="btn btn-outline-secondary" onClick={handleShow}> 
                                <FaQrcode/> qrCode
                            </button>
                        </div>
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
                                
                                <tr key={index} className="animated fadeIn">
                                    <th scope="row">{ voter.cin }</th>
                                    <td>{ voter.last_name }</td>
                                    <td>{ voter.first_name }</td>
                                    <td>
                                        <div className="text-left">
                                            {(voter.voted === 1) ?
                                                <button type="button" disabled className="btn btn-outline-secondary">A déja voter</button>
                                            :     
                                                <button type="button" onClick={this.handleCheck(voter._id.$oid)} className="btn btn-outline-primary">Check</button>
                                            }
                                        </div>
                                    </td>
                                </tr>
                            )
                            :
                            this.state.results_voters.map((voter, index) =>
                                <tr key={index}>
                                <th scope="row">{ voter.cin }</th>
                                <td>{ voter.last_name }</td>
                                <td>{ voter.first_name }</td>
                                <td>                                    
                                        <div className="text-left">
                                            {(voter.voted === 1) ?
                                                <button type="button" disabled className="btn btn-outline-secondary">A déja voter</button>
                                            :     
                                                <button type="button" onClick={this.handleCheck(voter._id.$oid)} className="btn btn-outline-primary">Check</button>
                                            }
                                        </div>
                                </td>
                                </tr>
                            )
                        }
                        </tbody>
                        </table>
                        </div>
                    <div className="my-5"></div>
                    {/* <p className="lead mb-0">You've reached the end!</p> */}
                    </div>
                </div>
                <ToastContainer />

                {/* Modal qrCode */}
                <Modal show={this.state.show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Scanne qrCode</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <QrReader
                        delay={300}
                        onError={this.handleError}
                        onScan={this.handleScan}
                        style={{ width: '100%' }}
                    />
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Annuler
                    </Button>
                    </Modal.Footer>
                </Modal>
                {/* End Modal qrCode */}
            </div>
        );
    }
}

export default Dashboard