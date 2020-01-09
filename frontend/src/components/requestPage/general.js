import React from 'react';
import '../../css/general.css'
import SideBlock from './sideBlock/sideBlock';
import RequestBlock from './requestBlock/requestBlock'
import AddRequestModal from './modal/addRequestModal'


class RequestGeneral extends React.Component {
	state = {
		isOpenRequestModal: false,
		dataModal: null,
		changeCollectionRequest: null,
		newCollectionQuantity: null,
		requestData: null,
		responseRequestData: null,
	};
	updateOpenRequest = (data) => {
		if (this.state.isOpenRequestModal === false) {
			this.setState({isOpenRequestModal: true});
			if (data !== null) {
				this.setState({dataModal: data});
			}
		} else {
			this.setState({isOpenRequestModal: false});
			this.setState({dataModal: null})
		}
	};

	updateResponseRequestData = (data) => {
		this.setState({responseRequestData: data})
	};

	changeRequestData = (data) => {
		this.setState({requestData: data})
	};

	changeRequest = (data) => {
		this.setState({changeCollectionRequest: data})
	};

	changeNewCollectionQuantity = (collectionId, quantity) => {
		this.setState({
			newCollectionQuantity: {
				collectionId: collectionId,
				quantity: quantity
			}
		})
	}

	resetNewCollectionQuantity = () => {
		this.setState({newCollectionQuantity: null})
	}

	render() {
		return (
			<div className='row generalApp' style={{marginLeft: '0'}}>
				<SideBlock
					updateOpenRequest={this.updateOpenRequest}
					changeCollectionRequest={this.state.changeCollectionRequest}
					changeRequest={this.changeRequest}
					newCollectionQuantity={this.state.newCollectionQuantity}
					resetNewCollectionQuantity={this.resetNewCollectionQuantity}
					changeRequestData={this.changeRequestData}
					responseRequestData={this.state.responseRequestData}
					updateResponseRequestData={this.updateResponseRequestData}
				/>

				{(this.state.isOpenRequestModal === true) ?
					<AddRequestModal dataModal={this.state.dataModal} updateOpenRequest={this.updateOpenRequest}
					                 changeRequest={this.changeRequest}
					                 changeNewCollectionQuantity={this.changeNewCollectionQuantity}/> : ''}

				<RequestBlock
					requestData={this.state.requestData}
					changeRequestData={this.changeRequestData}
					updateResponseRequestData={this.updateResponseRequestData}
				/>
			</div>
		);
	}
}

export default RequestGeneral;