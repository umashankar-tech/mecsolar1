import React from 'react'
import { Redirect } from 'react-router-dom'
import { getCookie } from "src/contexts/AuthContext"

class AuthorisedRoute extends React.Component {

    render() {
        const Component = this.props.component;
        const isAuthenticated = getCookie('_tok') != null ? true : false;
       
        return isAuthenticated ? (
            <Component />
        ) : (
            <Redirect to={{ pathname: '/login' }} />
        );
    }
}

export default AuthorisedRoute;