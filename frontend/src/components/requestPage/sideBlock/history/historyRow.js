import React from 'react';
import '../../../../css/sideBlock/history/historyRow.css'
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import {faWindowClose} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class HistoryRow extends React.Component {
	state = {
		collections: [],
		isOpen: false
	};

	async componentDidMount() {
		const response = await fetch(`http://127.0.0.1:8000/collections/get_collections`);
		const json = await response.json();
		this.setState({collections: json.collection});
	}

	async selectCollection(collection) {
		let headers = {};
		this.props.headers.map(function (collection) {
			if (collection.key !== '') {
				headers[collection.key] = collection.value;
			}
		});
		const response = await fetch('http://127.0.0.1:8000/collections/add_req_collection/', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(
				{
					method: this.props.method,
					url: this.props.url,
					headers: headers,
					body: this.props.body,
					collection: collection
				})
		});
		const json = await response.json();
		this.setState({isOpen: false})
	}

	render() {
		const _this = this;

		function openCollectionsWindow() {
			if (_this.state.isOpen === false) {
				_this.setState({isOpen: true})
			} else {
				_this.setState({isOpen: false})
			}
		}

		async function deleteHistoryRequest() {
			const response = await fetch('http://127.0.0.1:8000/req/delete_req/', {
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
			_this.props.deleteColl(_this.props.id);
		}

		function clickHistoryRow() {
			_this.props.changeRequestDataHistoryRow(
				{
					url: _this.props.url,
					method: _this.props.method,
					header: _this.props.header,
					body: _this.props.body
				}
			)
		}

		let requestMethod = this.props.method === 'POST' ? <div className='postMethod col-2'>POST</div> :
			<div className='getMethod col-2'>GET</div>;
		return (
			<div className='historyRow row' onClick={clickHistoryRow}>
				{requestMethod}
				<div className='requestUrl'>{this.props.url}</div>
				<div className='requestAdditionalButtons'>
					{(this.state.isOpen === false) ?
						<FontAwesomeIcon icon={faPlusSquare} className='requestAdditionalButton'
						                 onClick={openCollectionsWindow}/> :
						<FontAwesomeIcon icon={faWindowClose} className='requestAdditionalButton'
						                 onClick={openCollectionsWindow}/>

					}
					<FontAwesomeIcon icon={faTrash} className='requestAdditionalButton' onClick={deleteHistoryRequest}/>
				</div>
				{(this.state.isOpen) ?
					<div className='historyRowCollections'>
						<div className='historyRowCollectionsHeader'>Select collection</div>
						{this.state.collections.map(collection =>
							<div key={collection.id} onClick={() => this.selectCollection(collection.id)}
							     className='historyRowCollectionsItem'>{collection.name}</div>
						)}
					</div> : ''
				}
			</div>
		);
	}
}

export default HistoryRow;
