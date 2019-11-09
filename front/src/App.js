import React, { Component , Suspense } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/admin/index.js';
// import Header from './components/layouts/header.js';
import Login from './components/layouts/login';
// import Register from './components/layouts/form_register.js';
// import ForgotPassword from './components/layouts/forgot_password.js'
// import ChangePassword from './components/layouts/change_pass.js'
import Home from './components/layouts/index';

// const URL_WEBUI = "https://accounts.blockchainmyart.org/#/webui";
class App extends Component {


  constructor(props) {
    super(props)
    this.login = this.login.bind(this)
    this.state = {isAuth : false , appMount : false}
    this.callLogout = this.callLogout.bind(this)
  }


  login() {
    return new Promise((resolve,reject) =>
    {
      setTimeout(() => {  this.setState({ isAuth: true }); resolve(true); }, 300)
    });
  }

  componentDidMount() {
    if('token' in window.localStorage) {
      this.setState({ isAuth: true }); 
    }
    this.setState({ appMount: true }); 
  }

  callLogout() {
    this.setState({isAuth : false});
    console.log("______logout");
    
    return new Promise((resolve,reject) => {
        window.localStorage.clear();
        resolve(true);
    });
  }

  render() {
    
    let route;
    if(this.state.isAuth === true && 1 === 2) 
    {
      route = (
        <Route
           
          path='/dashboard'
          render={(props) => <Dashboard {...props} appMount={this.state.appMount} callLogout={this.callLogout} isAuth={this.state.isAuth} />}
        />
      );
    }
    

    return (
      <Suspense fallback="loading">
          <div className="content_main">
        <Router>
            <Switch>
            <Route
              
              path='/dashboard'
              component={(props) => <Dashboard {...props} appMount={this.state.appMount} callLogout={this.callLogout} isAuth={this.state.isAuth} />}
            />    
    
              <Route
                exact 
                path='/'
                component={(props) => <Home {...props} login={this.login} isAuth={this.state.isAuth} />}
              />
    
              <Route
                exact
                path='/login'
                component={(props) => <Login {...props} login={this.login} isAuth={this.state.isAuth} />}
              />
            
            {/* <Route
              exact
              path='/register'
              component={(props) => <Register {...props} login={this.login} isAuth={this.state.isAuth} />}
            /> */}
        
               
            </Switch>
        </Router>
          </div>   
          
      </Suspense>
    );
  }
}

export default App;

