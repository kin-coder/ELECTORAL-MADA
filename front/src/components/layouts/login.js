import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../assets/css/login.css';
import BASE_URL from '../../../login.json';
import SweetAlert from 'sweetalert2-react';

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
          [e.target.name]: e.target.value,
          msg_ko:""
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
                    axios.get(`${BASE_URL}`, { email, password })

                    .then(response => {
                        if(response.data.status === "success"){
                            this.props.login()
                            .then((data) => { 
                                // window.localStorage.setItem('id',response.data.id);
                                window.localStorage.setItem('token',response.data.token);
                                // window.localStorage.setItem('expires',response.data.expires);
                                window.localStorage.setItem('email',response.data.email);
                                // window.localStorage.setItem('label',response.data.label);
                                this.props.history.push("/dashboard");
                            });
                        }else {
                            if(response.data.message === "auth_error"){
                                this.setState({ show: true, isAuth: false, msg_ko: "Identifiant Error !" });
                            }
                            if(response.data.message === "disabled_user"){
                                this.setState({ show: true, isAuth: false, msg_ko: this.props.t('user_disabled') });
                            }
                        }
                        
                    })
                    .catch(error => {
                        throw(error); 
                    });
            }   
      };
    render() {
      return (
        <section className="main">
            <div className="container">
                <div className="row justify-content-center">
                <div className="col-md-5 col-10">
                <h1 className="text-center my-3">Login</h1>
                {/* <p className="mb-0 text-center msg_ko">{this.state.msg_ko}</p> */}
                <Form className="py-3" onSubmit={ this.handleSubmit }>
                    <Form.Group controlId="formLoginEmail">
                        <Form.Label>{this.props.t('email')}</Form.Label>
                        <Form.Control type="email" placeholder={this.props.t('email')} name="email" onChange={ this.handleInputChange } value={ this.state.email } required />
                    </Form.Group>

                    <Form.Group controlId="formLoginPassword">
                        <Form.Label>{this.props.t('password')}</Form.Label>
                        <Form.Control type="password" placeholder={this.props.t('password')} autoComplete="off" name="password" onChange={ this.handleInputChange } value={ this.state.password } required />
                    </Form.Group>
                        <div className="d-flex justify-content-between align-items-center">
                            
                            <Form.Check type="checkbox" label={this.props.t('remember_me')} />
                            
                            <Button variant="outline-dark" type="submit">{this.props.t('btn_login')}</Button>
                            
                        </div>
                </Form>
                <hr className="w-100" />
                <div className="d-flex justify-content-around py-3">
                    <Link to="/forgot_password">{this.props.t('forgot_password')}</Link>
                        <span> | </span>
                    <Link to="/register">{this.props.t('signup')}</Link>
                </div>
                </div>
                </div>
                <SweetAlert
                    show={this.state.show}
                    type="warning"
                    text={this.state.msg_ko}
                    onConfirm={() => this.setState({ show: false })}
                />
            </div>
        </section>
        );
    }
}

export default withTranslation()(FormLogin);
