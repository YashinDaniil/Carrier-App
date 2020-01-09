import React from 'react';
import '../../../css/requstBlock/errorMessage.css'

class ErrorMessage extends React.Component {
	render() {
		return (
			<div className='errorMessage'>
				<div className='errorMessageTitle'>{this.props.errorMessage}</div>
			</div>
		);
	}
}

export default ErrorMessage;