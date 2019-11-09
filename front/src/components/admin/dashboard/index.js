import React, { Component } from 'react';

class Dashboard extends Component {
    render() {
        return (

            <div className="mx-lg-5 mx-md-5 mx-2">
                <div className="card border-0 shadow my-5">
                    <div className="card-body p-5">
                    <h1 className="font-weight-light mb-5">Liste des Electeurs</h1>
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">CIN</th>
                            <th scope="col">NOM</th>
                            <th scope="col">Prénom</th>
                            <th scope="col"> - </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            </tr>
                            <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            </tr>
                            <tr>
                            <th scope="row">3</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                            </tr>
                        </tbody>
                        </table>
                    <div className="my-5"></div>
                    <p className="lead mb-0">You've reached the end!</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard