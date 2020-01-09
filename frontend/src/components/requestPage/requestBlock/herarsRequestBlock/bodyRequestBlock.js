import React from 'react';
import ReactJson from 'react-json-view'

import '../../../../css/requstBlock/requestBlock/bodyRequestGeneral.css'

class BodyRequestBlock extends React.Component {
	state = {
		requestBody: null,
	};
	onEditBody = e => {
		this.props.onEditRequestBody(e);
	};

	onDeleteBody = e => {
		this.props.onDeleteRequestBody(e);
	};

	onAddBody = e => {
		this.props.onAddRequestBody(e);
	};

	render() {
		return (
			<div className='bodyRequestBlock'>
				<div className='bodyRequestBlockJson'>
					<ReactJson
						name='body'
						theme='rjv-default'
						onEdit={this.onEditBody}
						onDelete={this.onDeleteBody}
						onAdd={this.onAddBody}
						src={this.props.body}
					/>
				</div>

			</div>
		);
	}
}

export default BodyRequestBlock;