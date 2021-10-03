import React, { Component } from 'react';

import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import AuthContext from '../context/auth-context';
import './Lifts.css';

class LiftsPage extends Component {
    state = {
        creating: false
    };
    
    constructor(props) {
        super(props);
        this.nameElRef = React.createRef();
        this.weightElRef = React.createRef();
        this.repsElRef = React.createRef();
        this.dateElRef = React.createRef();
    }
    
    static contextType = AuthContext;
    
    startCreateLiftHandler = () => {
        this.setState({creating: true});
    }
    
    modalConfirmHandler = () => {
        const name = this.nameElRef.current.value;
        const weight = +this.weightElRef.current.value;
        const reps = +this.repsElRef.current.value;
        const date = this.dateElRef.current.value;
        
        if (
            name.trim().length === 0 
            || weight<=0
            || reps<=0 
            || date.trim().length === 0 
        ) {
            return;
        }
        
        let requestBody = {
                query: `
                    mutation {
                        createLift(liftInput: {name: "${name}", weight: ${weight}, reps: ${reps}, date: "${date}"}) {
                            _id
                            name
                            weight
                            reps
                            date
                            lifter {
                                _id
                                email
                            }
                        }
                    }
                `
            }; 
        fetch('http://localhost:8000/graphql', {
        method: 'POST'
        ,body: JSON.stringify(requestBody)
        ,headers: {
             'Content-Type': 'application/json'
            , Authorization: 'Bearer '+this.context.token
        }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('failed');
            }
            console.log(res.json())
            return res.json();
            }).then(resData => {
                this.setState({creating: false});
            }).catch(err => {
                console.log(err);  
        });    
    };
    
    modalCancelHandler = () => {
        this.setState({creating: false});
    };
    
    render () {
        return  (
            <React.Fragment>
                {this.state.creating && <Backdrop />}
                {this.state.creating && <Modal  title="Add Lift" 
                                                canCancel 
                                                canConfirm 
                                                onCancel={this.modalCancelHandler} 
                                                onConfirm={this.modalConfirmHandler}>
                    <form>
                        <div className="form-control">
                            <label htmlFor="name">Lift Name</label>
                            <input type="text" id="name" ref={this.nameElRef}></input>
                        </div>
                        <div className="form-control">
                            <label htmlFor="weight">Weight</label>
                            <input type="text" id="weight" ref={this.weightElRef}></input>
                        </div>
                        <div className="form-control">
                            <label htmlFor="reps">Repetitions</label>
                            <input type="text" id="reps" ref={this.repsElRef}></input>
                        </div>
                        <div className="form-control">
                            <label htmlFor="date">Date</label>
                            <input type="date" id="date" ref={this.dateElRef}></input>
                        </div>
                    </form>
                </Modal>}
                <div className="lifts-control">
                    <button type="button" onClick={this.startCreateLiftHandler}>Enter A Lift</button>
                </div>
            </React.Fragment>
        );
    }
}

export default LiftsPage