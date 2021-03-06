import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import AuthPage from './pages/Auth';
import LiftsPage from './pages/Lifts';
import ProfilePage from './pages/Profile';
import MainNavigation from './components/Navigation/MainNavigation';
import AuthContext from './context/auth-context';

import './App.css';

class App extends Component {
    state = {
        token: null
        ,userId: null
    }
    
    login = (token, userId, tokenExpiration) => {
        this.setState({ token: token, userId: userId });
    };
    logout = () => {
        this.setState({token: null, userId: null});
    };
    
    render() {
        return (
            <BrowserRouter>
                <React.Fragment>
                <AuthContext.Provider value={{token: this.state.token
                                            , userId: this.state.userId
                                            , login: this.login
                                            , logout: this.logout}}>
                <MainNavigation/>
                <main className="main-content">
                    <Switch>
                        {!this.state.token && <React.Fragment>
                        <Redirect from="/" to="/auth" exact/>
                        <Redirect from="/lifts" to="/auth" exact/>
                        <Redirect from="" to="/auth" exact/>
                        <Route path="/auth" component={AuthPage}/>
                        </React.Fragment>}
                        
                        {this.state.token && <React.Fragment>
                        <Redirect from="/" to="/lifts" exact/>
                        <Redirect from="/auth" to="/lifts" exact/>
                        <Route path="/lifts" component={LiftsPage}/>
                        <Route path="/profile" component={ProfilePage}/>
                        </React.Fragment>}
                    </Switch>
                </main>
                </AuthContext.Provider>
                </React.Fragment>
            </BrowserRouter>
         );
    }
}

export default App;
