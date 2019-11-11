import React, { Component } from 'react';
import BASE_URL from '../../../cinfig';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js';
const AVATAR_URL = 'http://localhost:3000/avatar/';

class Resultat extends Component {
    state = {
        general_stats: [],
        participation: 0,
        total_voter: 0,
    }

    componentDidMount() {
         this.getData();
         setInterval(() => {
            this.getData();
         }, 5000); 
        
    }

    getData() {
        if("token" in localStorage) {
            const Authorization = localStorage.getItem('token');
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': Authorization,
            };

            axios.get(`${BASE_URL}/api/candidates/general_stat`, { headers })
                .then(res => {
                    if(res.data.results) {
                        const general_stats = res.data.results;
                        this.setState({ general_stats: general_stats, participation: res.data.participation, total_voter: res.data.total_voter });
                    }
                    else {
                        this.setState({ general_stats: [] });
                    }
                })
                .catch(error => {
                    console.log(error);
                });      
        }    
    }
    
    render() {
        
        return (

            <div className="mx-lg-5 mx-md-5 mx-2 bg-light">
                <ul className="list-group p-3">
                    <h1 className="font-weight-light mb-5">Résultat global des votes</h1>
                    <h3>Taux de participation: { this.state.participation }%</h3>
                    {
                        this.state.general_stats.length !== 0 ?
                            this.state.general_stats.map((g,i) => (
                                <li key={i} className="list-group-item p-3 mt-4 animated fadeIn">
                                    <div className="row">
                                        <div className="col-4 text-center">
                                            <img className="shadow rounded rounded-circle" style={ {border: "4px solid"} } height="150" src={ AVATAR_URL + g.avatar } alt="" />
                                        </div>
                                        <div className="col-4 candidat-name">
                                            <h3><b>{g.candidate_last_name +" "+ g.candidate_first_name}</b></h3>
                                            <h4>Numéro: {g.candidate_number}</h4>
                                            <h5><strong>Nombre de voie:</strong> {g.nb_votes}</h5>
                                        </div>
                                        <div className="col-4">
                                            <Doughnut 
                                                height={100} 
                                                data={{"%Votant": (100 - g.percent), "%Voies": g.percent}}
                                                data={{
                                                    labels: [(100 - g.percent) + '% Votant', g.percent+'% Voie'],
                                                    datasets: [{
                                                        label: '# of Votes',
                                                        data: [(100 - g.percent), g.percent],
                                                        backgroundColor: [
                                                            'rgba(255, 99, 132, 0.5)',
                                                            'rgba(54, 162, 235, 0.5)'
                                                        ],
                                                        borderColor: [
                                                            'rgba(255, 99, 132, 1)',
                                                            'rgba(54, 162, 235, 1)'
                                                        ],
                                                        borderWidth: 1
                                                    }]
                                                }}
                                                colors={["rgba(0,0,0,.5)","#28a745"]} 
                                            />
                                        </div>
                                    </div>
                                </li>
                            ))
                        : <span>Pending...</span>
                    }
                </ul>
            </div>
        );
    }
}

export default Resultat