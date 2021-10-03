import React, { Component } from 'react';

import Modal from '../components/Modal/Modal';
import './Lifts.css';

class LiftsPage extends Component {
    render () {
        return  (
            <React.Fragment>
                <Modal>
                    <p> Modal Content</p>
                </Modal>
                <div className="lifts-control">
                    <button type="button">Enter A Lift</button>
                </div>
            </React.Fragment>
        );
    }
}

export default LiftsPage