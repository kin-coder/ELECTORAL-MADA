import React, { Component } from 'react';
import BASE_URL from '../../../cinfig';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Voter extends Component {
    state = {
        nom:"",
        prenom:"",
        candidates: [],
        results_voters: [],
        find: "",
        session_id: "",
        voter_id: ""
    }

    constructor(props, context) {
        super(props, context);
        this.handleVoter = this.handleVoter.bind(this);        

    }

    notifyOK = () => {
        toast.info("Vote avec succès!", {
            position: toast.POSITION.TOP_CENTER
            });
    };

    componentDidMount() {
            this.renderData();
            setInterval(() => {
                this.renderData();
            }, 5000);
            
    }

    renderData() {
            const Authorization = localStorage.getItem('token');
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': Authorization,
            };
            const email = localStorage.getItem('email');
            axios.post(`${BASE_URL}/api/session_vote/check`, {email:email}, {headers} )
                .then( res  => {
                    if(res.data.session_vote === "blank"){
                        this.setState({
                            nom : "",
                            prenom : "",
                            candidates: []
                        })
                    } else{
                        this.setState({
                            nom : res.data.first_name_voter,
                            prenom : res.data.last_name_voter,
                            session_id : res.data.session_vote_id.$oid,
                            voter_id : res.data.voter_id
                        });

                        axios.get(`${BASE_URL}/api/candidates/`, { headers })
                            .then(res => {
                                const candidates = res.data;
                                this.setState({ candidates: candidates });
                            })
                            .catch(error => {
                                console.log(error);
                            });

                    }
                })
                .catch(error => {
                    
                })
    }

    handleVoter = (id) => e => {
        const Authorization = localStorage.getItem('token');
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': Authorization,
            };
            
            axios.post(`${BASE_URL}/api/session_vote/end`, {session_vote:this.state.session_id, candidate:id, voter:this.state.voter_id}, {headers} )
                .then( res  => {
                    this.notifyOK();
                })
                .catch(error => {
                    
                })
      } 
    
    render() {
        return (

        <section className="">
            
            <header className="text-center py-5 mb-4">
                <div className="container">
                    {(this.state.nom === "") ?
                    <h1 className="font-weight-light text-white">Aucun Electeur en attente</h1>
                    :
                    <h1 className="font-weight-light text-white">{this.state.prenom+' '+this.state.nom}, choisir voter Candidat</h1>
                    }
                </div>
            </header>

            <div className="d-flex justify-content-center">
                
                <div className="col-md-10 col-10">
                    <div className="row">
                        {this.state.candidates.map((candidate, index) =>
                            <div className="col-xl-3 col-md-3 mb-4" key={index}>
                                <div className="card border-0 cardCandidat shadow" onClick={this.handleVoter(candidate._id.$oid)}>
                                    <img src={BASE_URL+'/avatar/'+candidate.avatar} className="card-img-top" alt="..." />
                                    <div className="card-body text-center">
                                        <h5 className="card-title mb-0">Numéro : {candidate.number}</h5>
                                        <div className="card-text text-black-50">{candidate.first_name+' '+candidate.last_name}</div>
                                    </div>
                                </div>
                            </div>
                            
                        )}

                    </div>
                </div>
            </div>
            <ToastContainer />
        </section>
        );
    }
}

export default Voter