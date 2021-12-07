import React from 'react';

const ErrorComponent = ({ error, message }) => {
    return (
        <h4>{error} error: {message}</h4>
    );
};

export default ErrorComponent;
