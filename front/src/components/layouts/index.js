import React,{ Component } from 'react';

class Home extends Component {

    componentDidMount () {
        console.log(this.props);
        if("token" in localStorage){
            this.props.history.push("/dashboard");
        }else{
            this.props.history.push("/login");
        }
    }
    render() {
        return (
            <span>Seanaps</span>
        );
    }
}

export default Home