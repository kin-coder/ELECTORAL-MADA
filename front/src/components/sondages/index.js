import React, { Component } from 'react';
import BASE_URL from '../../cinfig';
import axios from 'axios';
import { Form, Modal } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { FaQrcode } from "react-icons/fa";
import QrReader from 'react-qr-reader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Sondages extends Component {
    state = {
        candidates : [],
        candidate: "",
        results_voters : [],
        voter: "",
        comment : "",
        file: null,
        sondages : [],
        show: false,
        result_qr: "No result"
    }
    
    constructor(props, context) {
        super(props, context);  
        this.handleSubmit = this.handleSubmit.bind(this);             
    }

    notifyOK = () => {
        toast.info("Succès!", {
            position: toast.POSITION.TOP_CENTER
            });
    };

    componentDidMount() {

        const headers = {
            'Content-Type': 'application/json'
        }
        axios.get(`${BASE_URL}/api/candidates`, { headers })
            .then(res => {
                const candidates = res.data;
                this.setState({ candidates: candidates });
            })
            .catch(error => {
                console.log(error);
            });

        this.getSondages();
        setInterval(() => {
            this.getSondages();
        }, 5000);
    }

    getSondages() {
        const headers = {
            'Content-Type': 'application/json'
        }
        axios.get(`${BASE_URL}/surveys/`, { headers })
            .then(res => {
                const sondages = res.data;
                this.setState({ sondages: sondages });
            })
            .catch(error => {
                console.log(error);
            });
    }


    handleScan = data => {
        if (data) {
             
        this.setState({
                voter:data,
                show: false,
            })
        }

    }

    handleError = err => {
        console.error(err)
    }
  

    handleSubmit = e => {
        e.preventDefault();
            const headers = {
                'Content-Type': 'multipart/form-data',
            };
            let param = new FormData();
            // param.set("voter", this.state.voter);
            // param.set("candidate", this.state.candidate);
            // param.set("comment", this.state.comment);
            param.append("file", this.state.file);

            const { voter, candidate, comment, file } = this.state;
            console.log({ voter, candidate, comment, file });
                axios.post(`${BASE_URL}/surveys/create`, 
                    param, { headers })
                    .then(res => {
                        if(res.data.success === "ok") {
                            console.log('OKOKOKOKO--------');
    
                            this.setState({
                                show: false,
                            })
                        }

                    })
                    .catch(error => {
                        console.log(error);
                    });        
        
    }

    handleInputChange = e => {
        // if (e.target.type == 'file')
        this.setState({
            [e.target.name]: e.target.value,
          });
    };

    _onchange = e =>{
        e.preventDefault();
            const headers = {
                'Content-Type': 'application/json',
            };
            let param = new FormData();

            param.append("file", e.target.files[0]);

            const { voter, candidate, comment, file } = this.state;
                axios.post(`${BASE_URL}/surveys/create`, 
                { voter:voter, candidate:candidate, comment:comment } , { headers })
                    .then(res => {
                        if(res.data.success === "ok") {
                            axios.post(`${BASE_URL}/surveys/update`, 
                            param , { headers })
                            .then(res => {
                                this.notifyOK();
                            })

                            .catch(error => {
                                console.log(error);
                            }); 
                        }

                    })
                    .catch(error => {
                        console.log(error);
                    });   
    }
    
    render() {
        const url_file = BASE_URL+"/surveys/media/";
        const handleClose = () => 
        this.setState({
            show: false
        });
        const handleShow = () => 
            this.setState({
                show: true
        });
        return (
            <div className="px-5 py-5 mx-lg-5 mx-md-5 mx-2 bg-light my-5">
                <h1 className="font-weight-light mb-5">
                    Sondages 
                </h1>
                <div className="col-md-12 col-12">
                    <form className="form-create" onSubmit={this.handleSubmit} >
                        <div className="row">
                            <div className=" col-md-3 px-1 col-lg-3 col-12 form-label-group mb-5">
                                <Form.Control type="text" name="comment" id="inputFirst_name" onChange={ this.handleInputChange } value={ this.state.first_name } className="form-control" placeholder="Prénom" required autoFocus />
                                <label htmlFor="inputFirst_name">Comment</label>
                            </div>
                            <div className="col-md-3 px-1 col-lg-3 col-12 form-label-group mb-5">
                                <Form.Control as="select" name="candidate" className="h-100" value={this.state.candidate} onChange={this.handleInputChange} required>
                                    <option value="">Candidat</option>
                                    {this.state.candidates.map((candidate, index) =>
                                        <option key={ index } value={candidate._id.$oid}>
                                            {candidate.last_name+' #'+candidate.number }
                                        </option>
                                    )}
                                </Form.Control>
                            </div>
                            <div className=" col-md-3 px-1 col-lg-3 col-12 form-label-group mb-5" onClick={handleShow}> 
                                <Form.Control disabled type="text" name="comment" id="inputFirst_name"  onChange={ this.handleInputChange } value={ this.state.voter } className="form-control" placeholder="Prénom" required autoFocus />
                                <label htmlFor="inputFirst_name">CIN</label>
                            </div>
                            <div className=" col-md-3 px-1 col-lg-3 col-12 form-label-group mb-5">
                                <Form.Control type="file" name="file" id="inputLast_name" onChange={ this._onchange } value={ this.state.file } className="form-control" placeholder="Nom" required />
                                <label htmlFor="inputLast_name">Ficher</label>
                            </div>
                        </div>
                    </form>
                    <div className="col-md-10 col-10">
                        <div className="row">
                    { (this.state.sondages.length !== 0) ?
                    this.state.sondages.map((sondage, index) =>
                                <div className="col-xl-3 col-md-3 mb-4" key={index}>
                                    <div class="card">
                                        <img src={url_file+sondage.id.$oid} class="card-img-top"/>
                                            <div class="card-body">
                                                <h5 class="card-title">
                                                    {sondage.candidate_name+' #'+sondage.candidate_number}
                                                </h5>
                                                <p class="card-text text-dark">
                                                    >> {sondage.comment}    
                                                </p>
                                                <i class="text-primary">{sondage.voter_name}</i>
                                            </div>
                                    </div>
                                </div>
                    )
                    :
                    <small>Aucun Sondage</small>
                }
                        </div>
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

                        </Modal.Footer>
                    </Modal>
                    {/* End Modal qrCode */}
                </div>
        );
    }
}

export default Sondages