import React from 'react';
import { NavLink } from 'react-router-dom';

import AuthContext from '../../context/auth-context';
import './MainNavigation.css'

const mainNavigation = props => (
    <AuthContext.Consumer>
        {(context) => {
            return (
            <header className = "main-navigation">
                <div className = "main-navigation_logo">
                {!context.token && 
                    <NavLink to="/auth" style={{ textDecoration: 'none' }}>
                        <h1> liftTracker </h1>
                    </NavLink>}
                {context.token && 
                    <NavLink to="/lifts" style={{ textDecoration: 'none' }}>
                        <h1> liftTracker </h1>
                    </NavLink>}
                </div>
            <nav className = "main-navigation_items">
                <ul>
                {context.token && 
                    <React.Fragment>
                        <li><button><NavLink to="/lifts"> Lifts</NavLink></button></li>
                        <li><button><NavLink to="/profile"> Profile</NavLink></button></li>
                        <li><button onClick={context.logout}>Logout</button></li>
                    </React.Fragment>}
                </ul>
            </nav>
            </header>
    )}}
    </AuthContext.Consumer>
    );
    
export default mainNavigation;