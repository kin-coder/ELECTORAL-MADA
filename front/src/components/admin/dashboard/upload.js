import React, { Component } from 'react';
import BASE_URL from '../../../cinfig';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
import 'react-toastify/dist/ReactToastify.css';

class Upload extends Component {
    state = {
        number : "",

    }
    
    constructor(props, context) {
        super(props, context);  
        // this.handleSubmit = this.handleSubmit.bind(this);             
    }

    notifyOK = () => {
        toast.info("Insertion avec succès!", {
            position: toast.POSITION.TOP_CENTER
            });
    };

    componentDidMount() {
        
    }

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
          });
        };
    
    render() {
        const MyUploader = () => {
            // specify upload params and url for your files
            const getUploadParams = ({ meta }) => { return { url: 'https://47b00da9.ngrok.io/avatar/' } }
            
            // called every time a file's `status` changes
            const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }
            
            // receives array of files that are done uploading when submit button is clicked
            const handleSubmit = (files, allFiles) => {
              console.log(files.map(f => f.meta))
              allFiles.forEach(f => f.remove())
            }
          
            return (
              <Dropzone
                getUploadParams={getUploadParams}
                onChangeStatus={handleChangeStatus}
                onSubmit={handleSubmit}
                accept="image/*,audio/*,video/*"
              />
            )
          }
        
        return (

            <div className="px-5 py-5 mx-lg-5 mx-md-5 mx-2 bg-light">
                <h1 className="font-weight-light mb-5">Insertion nouveau Media</h1>
                
                <div className="col-md-8 col-10">
                    
                        <div className="form-label-group mb-5">
                            <Form.Control type="number" name="number" id="inputNumber" onChange={ this.handleInputChange } value={ this.state.number } className="form-control" placeholder="number" required />
                            <label htmlFor="inputNumber">NUMERO</label>
                        </div>
                        <div className="form-label-group mb-5">
                            <MyUploader />
                        </div>

                </div>
                <ToastContainer />
            </div>
        );
    }
}

export default Upload