import React from 'react';
import '../../../../css/sideBlock/collection/collectionBlock.css'
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import {faWindowClose} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import CollectionRow from './collectionRow'


class CollectionBlock extends React.Component {
	state = {
		collections: [],
		isOpenCreateCollectionBlock: false
	};

	openModalEditRequest = (data) => {
		this.props.openModalEditRequestWithData(data)
	};

	changeRequest = (data) => {
		this.props.changeRequest(data);
	};

	deleteCollection = (collectionId) => {
		this.setState({
			collections: this.state.collections.filter(function (collection) {
				return collection.id !== collectionId
			})
		});
	}

	async componentDidMount() {
		const response = await fetch(`http://127.0.0.1:8000/collections/get_collections`);
		const json = await response.json();
		this.setState({collections: json.collection});
	}

	editQuantity = (collectionId, quantity) => {
		let editCollections = this.state.collections;
		editCollections.filter(function (collection) {
			if (collection.id === collectionId) {
				collection.requestQuantity = quantity;
			}
		});
		this.setState({collections: editCollections});
	};

	changeRequestDataCollection = (data) => {
		this.props.changeRequestDataCollection(data)
	};
	changeRequestDataHistory

	render() {
		const _this = this;

		if (_this.props.newCollectionQuantity !== null) {
			_this.editQuantity(_this.props.newCollectionQuantity.collectionId, _this.props.newCollectionQuantity.quantity);
			_this.props.resetNewCollectionQuantity()
		}

		const collectionsList = this.state.collections.map((collectionItem) =>
			<CollectionRow
				key={collectionItem.id}
				id={collectionItem.id}
				name={collectionItem.name}
				quantity={collectionItem.requestQuantity}
				openModalEditRequest={this.openModalEditRequest}
				editQuantity={this.editQuantity}
				changeCollectionRequest={this.props.changeCollectionRequest}
				changeRequest={this.changeRequest}
				deleteCollection={this.deleteCollection}
				changeRequestDataCollection={this.changeRequestDataCollection}
			/>
		);

		function addNewRequestCollection() {
			_this.props.openModalEditRequestWithData(null);
		}


		function openCreateCollectionWindow() {
			if (_this.state.isOpenCreateCollectionBlock === false) {
				_this.setState({isOpenCreateCollectionBlock: true})
			} else {
				_this.setState({isOpenCreateCollectionBlock: false})
			}
		}

		async function createCollection() {
			const response = await fetch('http://127.0.0.1:8000/collections/create_collection/', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(
					{
						name: document.querySelector('.collectionCreateBlockInput').value,
					})
			});
			const json = await response.json();
			if (json.status === 'ok') {
				const response = await fetch(`http://127.0.0.1:8000/collections/get_collections`);
				const json = await response.json();
				_this.setState({collections: json.collection});

				document.querySelector('.collectionCreateBlockInput').value = '';
				_this.setState({isOpenCreateCollectionBlock: false});
			}
		}

		return (
			<div>
				<div className='collectionHeaderBlock'>
					<div className='d-flex justify-content-between'>
						<div className='collectionHeaderAddCollection' onClick={openCreateCollectionWindow}>
							{(this.state.isOpenCreateCollectionBlock) ?
								<FontAwesomeIcon icon={faWindowClose}/> :
								<FontAwesomeIcon icon={faPlusSquare}/>
							}
							{(this.state.isOpenCreateCollectionBlock) ?
								<span className='historyHeaderCleanHistoryTitle'>Close</span> :
								<span className='historyHeaderCleanHistoryTitle'>Add Collection</span>
							}

						</div>
						<div className='collectionHeaderAddCollection' onClick={addNewRequestCollection}>
							<FontAwesomeIcon icon={faPlusSquare}/>
							<span className='historyHeaderCleanHistoryTitle'>Add Request</span>
						</div>
					</div>
				</div>
				{(this.state.isOpenCreateCollectionBlock) ?
					<div className='collectionCreateBlock'>
						<input type="text" className='collectionCreateBlockInput'/>
						<FontAwesomeIcon icon={faPlusSquare} className='collectionCreateBlockButton'
						                 onClick={createCollection}/>
					</div> : ''
				}
				{collectionsList}
			</div>
		);
	}
}

export default CollectionBlock;
