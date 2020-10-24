import React from 'react';
import './ErrorNotification.scss';

const ErrorNotification = ({errorMsg}) => { 


    return(
    <span className="error_message"><h1>{errorMsg}</h1></span>
    )
};

export default ErrorNotification;