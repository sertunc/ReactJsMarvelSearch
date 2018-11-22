import React from 'react';
import PropTypes from 'prop-types'

const ErrorMessage = props => {

    const { errorMessage } = props;

    return (
        <div className="alert alert-danger" role="alert">
            <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
            <span className="sr-only">Error:</span>
            {errorMessage}
        </div>
    );
};

ErrorMessage.propTypes = {
    errorMessage: PropTypes.string.isRequired
}

export default ErrorMessage;
