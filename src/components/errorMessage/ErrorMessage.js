import React from 'react';
import img from './error.gif'
const ErrorMessage = () => {
    return (
        <div>
            <img style={{display: 'block', width: '250px', height: '250px', objectFit: 'contain', margin: '0 auto'}} src={img} alt="error" />
        </div>
    );
}

export default ErrorMessage;
