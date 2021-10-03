import React from 'react';

import './Modal.css';

const modal = props => {
    return (
        <div className="modal">
            <header className = "modal_header">
                <h1>{props.title}</h1>
            </header>
            <section className="modal_content">
                {props.children}
            </section>
            <section className="modal_actions">
                {props.canCancel && <button onClick={props.onCancel}>Cancel</button>}
                {props.canConfirm && <button onClick={props.onConfirm}>Confirm</button>}
            </section>
        </div>
    );
};

export default modal;