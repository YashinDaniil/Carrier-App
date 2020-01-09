import React from 'react';
import '../../../css/sideBlock/sideBar.css'

import MenuBlock from './sideBlockMenu'
import HistoryBlock from './history/historyBlock'
import CollectionBlock from './collection/collectionBlock'
import EnvBlock from './envBlock/envBlock'

class SideBar extends React.Component {
	state = {
		position: 0
	};

	changeRequestDataHistory = (data) => {
		this.props.changeRequestData(data)
	};

	openModalEditRequestWithData = (data) => {
		this.props.updateOpenRequest(data)
	};

	changeRequest = (data) => {
		this.props.changeRequest(data)
	};

	updateHistoryPosition = () => {
		this.setState({position: 0});
		document.querySelectorAll('.sideBlockMenuItem')[0].classList.add('selectMenuItem');
		document.querySelectorAll('.sideBlockMenuItem')[1].classList.remove('selectMenuItem');
		document.querySelectorAll('.sideBlockMenuItem')[2].classList.remove('selectMenuItem');
	};

	updateCollectionPositiony = () => {
		this.setState({position: 1});
		document.querySelectorAll('.sideBlockMenuItem')[0].classList.remove('selectMenuItem');
		document.querySelectorAll('.sideBlockMenuItem')[1].classList.add('selectMenuItem');
		document.querySelectorAll('.sideBlockMenuItem')[2].classList.remove('selectMenuItem');
	};

	updateEnvironmentPosition = () => {
		this.setState({position: 2});
		document.querySelectorAll('.sideBlockMenuItem')[0].classList.remove('selectMenuItem');
		document.querySelectorAll('.sideBlockMenuItem')[1].classList.remove('selectMenuItem');
		document.querySelectorAll('.sideBlockMenuItem')[2].classList.add('selectMenuItem');
	};

	updateNewResponseRequestDataReq = (data) =>{
		this.props.updateResponseRequestData(data)
	};

	render() {
		if (this.state.position === 0) {
			return (
				<div>
					<MenuBlock
						position={this.state.position}
						updateHistoryPosition={this.updateHistoryPosition}
						updateCollectionPositiony={this.updateCollectionPositiony}
						updateEnvironmentPosition={this.updateEnvironmentPosition}
					/>
					<div className='contentBlock'>
						<HistoryBlock
							changeRequestDataHistory={this.changeRequestDataHistory}
							newResponseRequestData={this.props.responseRequestData}
							updateNewResponseRequestDataReq={this.updateNewResponseRequestDataReq}
						/>
					</div>
				</div>
			);
		}
		if (this.state.position === 1) {
			return (
				<div>
					<MenuBlock
						position={this.state.position}
						updateHistoryPosition={this.updateHistoryPosition}
						updateCollectionPositiony={this.updateCollectionPositiony}
						updateEnvironmentPosition={this.updateEnvironmentPosition}
					/>
					<div className='contentBlock'>
						<CollectionBlock
							openModalEditRequestWithData={this.openModalEditRequestWithData}
							changeCollectionRequest={this.props.changeCollectionRequest}
							changeRequest={this.changeRequest}
							newCollectionQuantity={this.props.newCollectionQuantity}
							resetNewCollectionQuantity={this.props.resetNewCollectionQuantity}
							changeRequestDataCollection={this.changeRequestDataHistory}
						/>
					</div>
				</div>
			);
		}
		if (this.state.position === 2) {
			return (
				<div>
					<MenuBlock
						position={this.state.position}
						updateHistoryPosition={this.updateHistoryPosition}
						updateCollectionPositiony={this.updateCollectionPositiony}
						updateEnvironmentPosition={this.updateEnvironmentPosition}
					/>
					<div className='contentBlock'>
						<EnvBlock/>
					</div>
				</div>
			);
		}
	}
}

export default SideBar;