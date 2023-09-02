import React, {useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';

const ProtectedRoute = ({element: Component, ...props}) => {
    const [loggedIn, setLoggedIn] = useState(true);

    useEffect(() => {
        if (!localStorage.getItem('jwt')) {
            setLoggedIn(false);
        }
    }, []);

    return loggedIn ? <Component {...props} /> : <Navigate to="/"/>       
    
}

export default ProtectedRoute;