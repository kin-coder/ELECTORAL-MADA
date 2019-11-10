import React, { Component } from 'react';
import BASE_URL from '../../../cinfig';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class AddVoter extends Component {
    state = {
        first_name : "",
        last_name : "",
        cin : ""
    }
    
    constructor(props, context) {
        super(props, context);  
        this.handleSubmit = this.handleSubmit.bind(this);             
    }

    notifyOK = () => {
        toast.info("Insertion avec succès!", {
            position: toast.POSITION.TOP_CENTER
            });
    };

    componentDidMount() {
        
    }

    handleSubmit = e => {
        e.preventDefault();
        if("token" in localStorage) {
            const Authorization = localStorage.getItem('token');
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': Authorization,
            };
            const { first_name, last_name, cin } = this.state;
            axios.post(`${BASE_URL}/api/voters/create`, { first_name, last_name, cin }, { headers })
                .then(res => {
                    if(res.data.created_voter === "success") {
                       this.notifyOK();
                       setTimeout(() => {
                        this.props.history.push("/dashboard/");
                       }, 2000);
                    }
                    else {
                        console.log('Error');
                    }
                })
                .catch(error => {
                    console.log(error);
                });      
        }    
    }

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
          });
        };
    
    render() {
        
        return (

            <div className="px-5 py-5 mx-lg-5 mx-md-5 mx-2 bg-light">
                <h1 className="font-weight-light mb-5">Insertion nouveau Electeur</h1>
                
                <div className="col-md-8 col-10">
                    <form className="form-create" onSubmit={ this.handleSubmit }>
                        <div className="form-label-group mb-5">
                            <Form.Control type="text" name="first_name" id="inputFirst_name" onChange={ this.handleInputChange } value={ this.state.first_name } className="form-control" placeholder="Prénom" required autoFocus />
                            <label htmlFor="inputFirst_name">Prénom</label>
                        </div>
                        <div className="form-label-group mb-5">
                            <Form.Control type="text" name="last_name" id="inputLast_name" onChange={ this.handleInputChange } value={ this.state.last_name } className="form-control" placeholder="Nom" required />
                            <label htmlFor="inputLast_name">Nom</label>
                        </div>
                        <div className="form-label-group mb-5">
                            <Form.Control type="text" name="cin" id="inputCin" onChange={ this.handleInputChange } value={ this.state.cin } className="form-control" placeholder="CIN" required />
                            <label htmlFor="inputCIN">CIN</label>
                        </div>
                        <div className="text-right">
                            <button className="btn btn-secondary" type="submit">Valider</button>
                        </div>
                    </form>

                </div>
                <ToastContainer />
            </div>
        );
    }
}

export default AddVoter