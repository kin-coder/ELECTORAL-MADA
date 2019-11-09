import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../assets/css/login.css';
import BASE_URL from '../../cinfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class FormLogin extends Component {
    state = {
        email: "",
        password: "",
        isAuth: false,
        msg_ko:""
      };
    constructor (props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    notify = () => {
        toast.error("Identifiants invalides !", {
            position: toast.POSITION.TOP_LEFT
          });
    };

    componentDidMount () {
        // console.log(this.props);
        if(this.props.isAuth === true){
            this.props.history.push("/dashboard");
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.isAuth === true) {
            this.props.history.push("/dashboard");
        }
    }

    handleInputChange = e => {
        this.setState({
          [e.target.name]: e.target.value
        });
      };
      handleReset = () => {
        this.setState({
            email: "",
            password: ""
        });
      };
    handleSubmit = e => {
        e.preventDefault();
        if (this.state.email.trim() && 
            this.state.password.trim() 
            ) {
                const { email, password } = this.state;
                    // axios.post(`${BASE_URL}`, { email, password })
                    axios.post(`${BASE_URL}/session/`, { email, password })

                    .then(response => {
                        if(response.data.session){
                            this.props.login()
                            .then((data) => { 
                                // window.localStorage.setItem('id',response.data.id);
                                window.localStorage.setItem('token',response.data.session.jwt);
                                // window.localStorage.setItem('expires',response.data.expires);
                                window.localStorage.setItem('email',response.data.session.email);
                                // window.localStorage.setItem('label',response.data.label);
                                this.props.history.push("/dashboard");
                            });
                        }
                        
                    })
                    .catch(error => {
                        // this.setState({ show: true, isAuth: false, msg_ko: "Identifiant Error !" });
                        // console.log("koooooo");
                        this.notify();

                        
                    });
            }   
      };
    render() {
      return (
        <div className="container">
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card card-signin my-5">
                    <div className="card-body">
                        <h5 className="card-title text-center">Connexion</h5>
                        <form className="form-signin" onSubmit={ this.handleSubmit }>
                        <div className="form-label-group">
                            <Form.Control type="email" name="email" id="inputEmail" onChange={ this.handleInputChange } value={ this.state.email } className="form-control" placeholder="Email address" required autoFocus />
                            <label htmlFor="inputEmail">Adresse email</label>
                        </div>
        
                        <div className="form-label-group">
                            <Form.Control type="password" name="password" id="inputPassword" onChange={ this.handleInputChange } value={ this.state.password } className="form-control" placeholder="Password" required />
                            <label htmlFor="inputPassword">Mot de passe</label>
                        </div>
        
                        <div className="custom-control custom-checkbox mb-3">
                            <Form.Control type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Se souvenir de moi</label>
                        </div>
                        <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Se connecter</button>
                        <hr className="my-4" />
                        
                        <button className="btn btn-lg btn-facebook btn-block text-uppercase" type="reset"><i className="fab fa-facebook-f mr-2"></i> Sign in with Facebook</button>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
        );
    }
}

export default FormLogin;
