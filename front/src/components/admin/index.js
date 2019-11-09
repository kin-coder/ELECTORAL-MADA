import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import DashboardScreen from './dashboard/index.js';

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
  
    componentWillReceiveProps(nextProps) {
      console.log(this.props);    
      if(this.props.isAuth === false && nextProps.appMount === true) {
          this.props.history.push("/login");
      }
      if(nextProps.isAuth === false && this.props.appMount === true) {
        this.props.history.push("/login");
      }
    }
  
    render() {
      let routeAdmin;
      routeAdmin = (
        
        <Switch>
            <Route
              exact
              path='/dashboard'
              component = {DashboardScreen}
            />
            
      </Switch> 
             
      );
      return (
          <div className="wrapper pt-5">
              
                <div id="content">
                      <div className="pt-3 pb-0 mb-3">
                            {routeAdmin}
                      </div>
                    
                </div>
          </div>
          
      );
    }
  }
  
  export default Dashboard
  