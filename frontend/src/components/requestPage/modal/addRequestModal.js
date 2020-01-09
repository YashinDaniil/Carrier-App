import React from 'react';
import '../../../css/sideBlock/modal/addRequestModal.css'
import ModalSelectCollection from './modalSelectCollection'

import {faCaretDown, faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ReactJson from 'react-json-view'


class AddRequestModal extends React.Component {
	state = {
		requestUrl: null,
		isOpenDropdownMethod: false,
		collections: [],
		method: 'default',
		headers: null,
		body: null,
		collection: -1,
		collectionOld: -1,
		collectionName: null,
		url: 'http://127.0.0.1:8000/collections/add_req_collection/',
	};

	async componentDidMount() {
		if (this.props.dataModal !== null) {
			this.setState({
				requestUrl: this.props.dataModal.requestUrl,
				method: this.props.dataModal.method,
				headers: (this.props.dataModal.headers === '') ? {} : this.props.dataModal.headers,
				body: (this.props.dataModal.body === '') ? {} : this.props.dataModal.body,
				collection: this.props.dataModal.collection,
				collectionOld: this.props.dataModal.collection,
				collectionName: this.props.dataModal.collectionName,
				url: 'http://127.0.0.1:8000/collections/edit_req_collection/',
			});
			let collections = document.querySelectorAll('.collectionItem');
			let i;
			for (i = 0; i < collections.length; i++) {
				collections[i].style.backgroundColor = '#1e1e1e';
			}
			//document.querySelectorAll('#' + this.state.collectionName)[1].style.backgroundColor = '#2d2e31';
		} else {
			this.setState({url: 'http://127.0.0.1:8000/collections/add_req_collection/'})
			let collections = document.querySelectorAll('.collectionItem');
			let i;
			for (i = 0; i < collections.length; i++) {
				collections[i].style.backgroundColor = '#1e1e1e';
			}
		}

		const response = await fetch(`http://127.0.0.1:8000/collections/get_collections`);
		const json = await response.json();
		this.setState({collections: json.collection});
	}

	handleClick(method) {
		this.setState({method: method});
		this.setState({isOpenDropdownMethod: false});
	}

	onEditHeaders = e => {
		this.setState({headers: e.updated_src});
	};

	onDeleteHeaders = e => {
		this.setState({headers: e.updated_src});
	};

	onAddHeaders = e => {
		this.setState({headers: e.updated_src});
	};

	onEditBody = e => {
		this.setState({body: e.updated_src});
	};

	onDeleteBody = e => {
		this.setState({body: e.updated_src});
	};

	onAddBody = e => {
		this.setState({body: e.updated_src});
	};

	changeCollection = (collectionItemId, collectionName) => {
		this.setState({
			collection: collectionItemId,
			collectionName: collectionName
		});
	};

	render() {
		const _this = this;
		const reqMethodList = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'COPY', 'HEAD', 'OPTIONS', 'LINK', 'UNLINK', 'PURGE', 'LOCK', 'UNLOCK', 'PROPFIND', 'VIEW'];

		function openDropdown() {
			if (_this.state.isOpenDropdownMethod === false) {
				_this.setState({isOpenDropdownMethod: true})
			} else {
				_this.setState({isOpenDropdownMethod: false});
			}
		}

		function closeModal() {
			_this.props.updateOpenRequest(null)
		}

		async function sendRequest() {
			let requestObj = {
				method: _this.state.method,
				url: document.querySelector('.requestInputItem').value,
				headers: (_this.state.headers === {}) ? null : _this.state.headers,
				body: (_this.state.body === {}) ? null : _this.state.body,
				collection: _this.state.collection
			};
			if (_this.state.url === 'http://127.0.0.1:8000/collections/edit_req_collection/') {
				requestObj = Object.assign(requestObj, {id: _this.props.dataModal.id})
			}

			const response = await fetch(_this.state.url, {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(requestObj)
				}
			);
			const json = await response.json();
			if (json.status === 'Request Added') {
				closeModal();

				fetch('http://127.0.0.1:8000/collections/get_collection_quantity/' + requestObj.collection).then(response =>
					response.json().then(data => ({
							data: data,
							status: response.status,
						})
					).then(res => {
						if (res.data.requestQuantity !== undefined) {
							_this.props.changeNewCollectionQuantity(requestObj.collection, res.data.requestQuantity)
						}
					}));
			} else {
				if (json.status === 'Request Changed') {
					_this.props.changeRequest({
						method: _this.state.method,
						url: document.querySelector('.requestInputItem').value,
						headers: (_this.state.headers === {}) ? null : _this.state.headers,
						body: (_this.state.body === {}) ? null : _this.state.body,
						collectionOld: _this.state.collectionOld,
						collectionId: _this.state.collection,
						collectionName: _this.state.collectionName,
						requestId: _this.props.dataModal.id
					})
				}
			}
		}

		function showCreateCollectionInput() {
			document.querySelectorAll('.createCollectionBlock')[1].style.display = 'block';
			document.querySelectorAll('.collectionBlockList')[1].style.height = '120px';
		}

		async function createCollection() {
			document.querySelectorAll('.createCollectionField')[1].placeholder = '';
			document.querySelectorAll('.createCollectionField')[1].classList.remove('errorCreateCollection');
			let collectionName = document.querySelectorAll('.createCollectionField')[1].value;
			let isCreated = false;
			_this.state.collections.map(function (collection) {
				if (collection.name === collectionName) {
					isCreated = true
				}
			});
			if (isCreated === false) {
				const response = await fetch('http://127.0.0.1:8000/collections/create_collection/', {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(
						{
							name: collectionName
						})
				});
				const json = await response.json();
				let newCollection = {
					id: json.new_collection.id,
					name: json.new_collection.name,
				};
				_this.setState({
					collections: [..._this.state.collections, newCollection]
				});
				document.querySelectorAll('.createCollectionField')[1].value = '';
			} else {
				document.querySelectorAll('.createCollectionField')[1].value = '';
				document.querySelectorAll('.createCollectionField')[1].placeholder = 'Collection already exists';
				document.querySelectorAll('.createCollectionField')[1].classList.add('errorCreateCollection');
			}
		}

		return (
			<div>
				<div className="modal customModal" tabIndex="-1" role="dialog">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header-custom">
								<h5 className="modal-title">Add request</h5>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span className='modalCloseButton' aria-hidden="true"
									      onClick={closeModal}>&times;</span>
								</button>
							</div>
							<div className="modal-body-custom">
								<p>Requests are saved in collections (a group of requests).</p>
								{(this.state.requestUrl === null) ?
									<p>If you want to use the environment, write "{"{env}"} instead of the domain</p> :
									''
								}

								<div>
									<div className='dropdownMethod d-flex justify-content-around'
									     onClick={openDropdown}>
										{(this.state.method === 'default') ? 'Get Method' : this.state.method}
										<FontAwesomeIcon icon={faCaretDown} className='requestAdditionalButton'/>
									</div>
									{this.state.isOpenDropdownMethod &&
									<div className='dropdownList'>
										{reqMethodList.map(method =>
											<div key={method} onClick={() => this.handleClick(method)}
											     className='dropdownItem'>{method}</div>
										)}
									</div>
									}
								</div>

								<div className='modalBodyBlock'>
									<p>Request Url</p>
									{(this.state.requestUrl === null) ?
										<input className='requestInputItem' type="text"/> :
										<input className='requestInputItem' type="text" value={this.state.requestUrl}/>
									}
								</div>

								<div className='modalBodyBlock'>
									<p>Request Hears</p>
									<div className='requestTextareaItem'>
										{(this.state.headers === null) ?
											<ReactJson
												name='header'
												theme='twilight'
												onEdit={this.onEditHeaders}
												onDelete={this.onDeleteHeaders}
												onAdd={this.onAddHeaders}
											/> :

											<ReactJson
												name='header'
												theme='twilight'
												onEdit={this.onEditHeaders}
												onDelete={this.onDeleteHeaders}
												onAdd={this.onAddHeaders}
												src={this.state.headers}
											/>


										}
									</div>
								</div>

								<div className='modalBodyBlock'>
									<p>Request Body</p>
									<div className='requestTextareaItem'>
										{(this.state.body === null) ?
											<ReactJson
												name='body'
												theme='twilight'
												onEdit={this.onEditBody}
												onDelete={this.onDeleteBody}
												onAdd={this.onAddBody}
											/> :

											<ReactJson
												name='body'
												theme='twilight'
												onEdit={this.onEditBody}
												onDelete={this.onDeleteBody}
												onAdd={this.onAddBody}
												src={this.state.body}
											/>

										}
									</div>
								</div>

								<div className='modalBodyBlock'>
									<p>Collection List</p>
									<div className='collectionTable'>
										<div className='collectionHeaders row d-flex justify-content-between'>
											<div className='collectionHeaderButton allCollectionItem'>All collections
											</div>
											<div className='collectionHeaderButton createCollectionButton'
											     onClick={showCreateCollectionInput}>+Create collection
											</div>
										</div>
										<div className='createCollectionBlock'>
											<div>Collection Name</div>
											<input className='createCollectionField' type="text"/>
											<FontAwesomeIcon icon={faPlusSquare} className='createCollectionPlusButton'
											                 onClick={createCollection}/>
										</div>
										<div className='collectionBlockList'>
											<ModalSelectCollection
												collections={this.state.collections}
												selectCollectionItem={this.state.collection}
												changeCollection={this.changeCollection}
											/>
										</div>
									</div>
								</div>
							</div>
							<div className="modal-footer">
								{(this.state.requestUrl === null) ?
									<button onClick={sendRequest} type="button"
									        className="btn btn-primary">Save</button> :
									<button onClick={sendRequest} type="button" className="btn btn-primary">Save
										changes</button>
								}

								<button type="button" className="btn btn-secondary" data-dismiss="modal"
								        onClick={closeModal}>Close
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default AddRequestModal;