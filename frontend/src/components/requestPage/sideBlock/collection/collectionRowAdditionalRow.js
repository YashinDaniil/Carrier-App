import React from 'react';
import '../../../../css/sideBlock/collection/collectionRowAdditionalRow.css'
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class CollectionRowAdditionalRow extends React.Component {
	render() {
		const _this = this;

		async function deleteCollectionRequest() {
			const response = await fetch('http://127.0.0.1:8000/collections/delete_req_collection/', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(
					{
						id: _this.props.id
					})
			});
			const json = await response.json();
			_this.props.deleteReqColl(_this.props.id);
		}

		async function editCollectionRequest() {
			_this.props.openModalEditRequestData({
				requestUrl: _this.props.url,
				id: _this.props.id,
				method: _this.props.method,
				headers: _this.props.header,
				body: _this.props.body,
				collection: _this.props.collectionId,
				collectionName: _this.props.collectionName,
			})
		}

		let requestMethod = this.props.method === 'POST' ? <div className='postMethod col-2'>POST</div> :
			<div className='getMethod col-2'>GET</div>;


		function changeRequestDataCollectionAdditionalRow() {
			_this.props.changeRequestDataCollectionAdditional({
				url: _this.props.url,
				method: _this.props.method,
				header: _this.props.header,
				body: _this.props.body

			})
		}
		return (
			<div className='collectionAdditionalRow row' onClick={changeRequestDataCollectionAdditionalRow}>
				{requestMethod}
				<div className='requestUrl'>{this.props.url}</div>
				<div className='collectionAdditionalEditRequests'>
					<FontAwesomeIcon icon={faEdit} className='collectionAdditionalEditRequest'
					                 onClick={editCollectionRequest}/>
					<FontAwesomeIcon icon={faTrash} className='collectionAdditionalEditRequest'
					                 onClick={deleteCollectionRequest}/>
				</div>
			</div>
		);
	}
}

export default CollectionRowAdditionalRow;
