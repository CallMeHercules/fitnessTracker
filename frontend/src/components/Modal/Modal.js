import React from 'react';

import './Modal.css';

const modal = props => {
    return (
        <div className="modal">
            <header>{props.title}</header>
            <section className="modal_content">
                {props.children}
            </section>
            <section className="modal_actions">
                {props.canCancel && <button>Cancel</button>}
                {props.canConfirm && <button>Confirm</button>}
            </section>
        </div>
    );
};

export default modal;