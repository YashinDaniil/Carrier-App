import React from 'react';
import '../../../../css/sideBlock/collection/collectionRow.css'
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {faFolder} from "@fortawesome/free-solid-svg-icons";
import {faCaretRight} from "@fortawesome/free-solid-svg-icons";
import {faCaretDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import CollectionAdditionalRow from './collectionRowAdditionalRow'


class collectionRow extends React.Component {
	state = {
		isOpenCollection: false,
		collectionData: []
	};

	deleteRequestCollection = (requestId) => {
		this.setState({
			collectionData: this.state.collectionData.filter(function (req) {
				return req.id !== requestId
			})
		});
		this.props.editQuantity(this.props.id, this.props.quantity - 1)
		if (this.state.isOpenCollection === false) {
			this.setState({isOpenCollection: true});
		}
	};

	openModalEditRequestData = (data) => {
		this.props.openModalEditRequest(data);
	};

	changeRequestDataCollectionAdditional = (data) => {
		this.props.changeRequestDataCollection(data)
	}

	render() {
		const _this = this;

		function changeCollectionQuantity(collectionId) {
			fetch('http://127.0.0.1:8000/collections/get_collection_quantity/' + collectionId).then(response =>
				response.json().then(data => ({
						data: data,
						status: response.status,
					})
				).then(res => {
					if (res.data.requestQuantity !== undefined) {
						_this.props.editQuantity(collectionId, res.data.requestQuantity);
					}
				}));
		}

		if (_this.props.changeCollectionRequest !== null) {
			let newcollectionData = _this.state.collectionData;
			if (_this.props.id === _this.props.changeCollectionRequest.collectionId) {
				newcollectionData.map(function (requestData) {
					if (requestData.id === _this.props.changeCollectionRequest.requestId) {
						requestData.method = _this.props.changeCollectionRequest.method;
						requestData.body = _this.props.changeCollectionRequest.body;
						requestData.headers = _this.props.changeCollectionRequest.headers;
						requestData.collectionId = _this.props.changeCollectionRequest.collectionId;
						requestData.collectionName = _this.props.changeCollectionRequest.collectionName;
					}
				});
				_this.setState({collectionData: newcollectionData});
				_this.props.changeRequest(null);
				_this.openModalEditRequestData(null);
			} else {
				let filteredCollectionData = newcollectionData.filter(function (collectionRequest) {
					return collectionRequest.id !== _this.props.changeCollectionRequest.requestId;
				});
				_this.setState({collectionData: filteredCollectionData});
				_this.props.changeRequest(null);
				_this.openModalEditRequestData(null);
				changeCollectionQuantity(_this.props.changeCollectionRequest.collectionId);
				changeCollectionQuantity(_this.props.changeCollectionRequest.collectionOld);
				filteredCollectionData.length === 0 ? _this.setState({isOpenCollection: false}) : _this.setState({isOpenCollection: true});
			}
		}

		async function openCollection() {
			if (_this.state.isOpenCollection === false) {
				_this.setState({isOpenCollection: true});
				const response = await fetch('http://127.0.0.1:8000/collections/get_req/' + _this.props.id, {
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
				});
				const json = await response.json();
				_this.setState({collectionData: json.reqCol})
			} else {
				_this.setState({isOpenCollection: false});
			}
		}

		async function deleteCollection() {
			const response = await fetch('http://127.0.0.1:8000/collections/delete_collection/', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(
					{
						id: _this.props.id,
					})
			});
			const json = await response.json();
			if (json.status === 'Collection Deleted') {
				_this.props.deleteCollection(_this.props.id);
			}
		}

		return (
			<div className='collectionRow align-middle'>
				<div className='collectionRowGeneral row'>
					<div className='collectionRowGeneralHover row' onClick={openCollection}>
						<div className='collectionRowFolderGlobalBlock row'>
							{(this.state.isOpenCollection === false) ?
								<div className='collectionRowDropdownArrow'><FontAwesomeIcon icon={faCaretRight}
								                                                             className='collectionRowDropFolderIcons'/>
								</div> :
								<div className='collectionRowDropdownArrow'><FontAwesomeIcon icon={faCaretDown}
								                                                             className='collectionRowDropFolderIcons'/>
								</div>
							}
							<FontAwesomeIcon icon={faFolder} className='collectionRowDropFolderIcons'
							                 id='collectionRowFolderIcon'/>
						</div>
						<div className='collectionRowTitleCollection'>
							<div className='collectionRowName'>{this.props.name}</div>
							<div className='collectionRowRequestCol'>{this.props.quantity} requests</div>
						</div>
					</div>

					<div className='collectionAdditionalButtons'>
						<FontAwesomeIcon icon={faTrash} className='collectionAdditionalButton'
						                 onClick={deleteCollection}/>
					</div>
				</div>

				<div>
					{(this.state.isOpenCollection === true) ?
						this.state.collectionData.map((request) =>
							<CollectionAdditionalRow
								collectionId={this.props.id}
								collectionName={this.props.name}
								id={request.id}
								method={request.method}
								url={request.url}
								header={request.headers}
								body={request.body}
								deleteReqColl={this.deleteRequestCollection}
								openModalEditRequestData={this.openModalEditRequestData}
								changeRequestDataCollectionAdditional={this.changeRequestDataCollectionAdditional}
							/>
						) : ''
					}
				</div>
			</div>
		);
	}
}

export default collectionRow;
