import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { IoIosLock } from 'react-icons/io';
import { Link } from 'react-router-dom';
import DashboardScreen from './dashboard/index.js';
import VoterScreen from './dashboard/voter.js';
import ResultScreen from './dashboard/resultat.js';
import AddVoterScreen from './dashboard/addVoter.js';
import AddCandidatScreen from './dashboard/addCandidat.js';
const URL_VOTER = "http://localhost:8000/#/dashboard/voter";
class Dashboard extends Component {
    constructor (props){
      super(props);
      this.logout = this.logout.bind(this);
      this.handleToggle = this.handleToggle.bind(this);
  
      this.state = {
        open: false,
        isShow: true
      };
    }
  
    handleToggle = e => {
        this.setState({
            isShow: !this.state.isShow
        });
    }
    logout () {
      this.props.callLogout()
      .then(() => {
        
      }); 
    
    }
  
    componentDidMount () {
      console.log(this.props); 
      if(this.props.isAuth === false && this.props.appMount === true) {
        this.props.history.push("/login");
      }
      if(this.props.isAuth === false && this.props.appMount === true) {
        this.props.history.push("/login");
      }   
    }
  
    // componentWillReceiveProps(nextProps) {
    //   console.log(this.props);    
    //   if(this.props.isAuth === false && nextProps.appMount === true) {
    //       this.props.history.push("/login");
    //   }
    //   if(nextProps.isAuth === false && this.props.appMount === true) {
    //     this.props.history.push("/login");
    //   }
    // }
  
    render() {
      let routeAdmin;
      routeAdmin = (
        <Switch>
            <Route
              exact
              path='/dashboard'
              component = {DashboardScreen}
            />
            <Route
              path='/dashboard/voter'
              component = {VoterScreen}
            /> 

            <Route
              path='/dashboard/results'
              component = {ResultScreen}
            /> 
            <Route
              path='/dashboard/ajouterElecteur'
              component = {AddVoterScreen}
            />
            <Route
              path='/dashboard/ajouterCandidat'
              component = {AddCandidatScreen}
            />    
      </Switch> 
             
      );
      return (
        <div>
          { ( window.location.href === URL_VOTER ) ? 
            <span></span>
          :
          <nav className="navbar navbar-expand-md navbar-light bg-light static-top mb-5 shadow">
            <div className="container">
              <a className="navbar-brand" href="/"><span className="safid">SAFIDI</span><span className="ko">KO</span></a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
              <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item active">
                    <Link to="/dashboard/" className="nav-link">Accueil</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/dashboard/voter" className="nav-link">Voter</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/dashboard/results" className="nav-link">Résultats</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/dashboard/ajouterCandidat" className="nav-link">Candidats</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/login" onClick={this.logout} className="nav-link"><IoIosLock/> Déconnexion</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          
          }
        <div>
          {routeAdmin}
        </div>
        </div>              
          
      );
    }
  }
  
  export default Dashboard
  