import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

let ErrorMessage = (props) => {
	return (
		props.errorMessage ?
			<div className="error-wrapper">
				<p className="error">{props.errorMessage}</p>
			</div>
			:<div></div>
	);
};

ErrorMessage.propTypes = {
	errorMessage: PropTypes.string
};

const mapStateToProps = (state) => ({
	errorMessage: state.errorMessage
});

ErrorMessage = connect(mapStateToProps)(ErrorMessage);

export default ErrorMessage;