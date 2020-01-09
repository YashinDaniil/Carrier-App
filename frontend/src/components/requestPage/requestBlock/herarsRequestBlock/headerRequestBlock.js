import React from 'react';
import '../../../../css/requstBlock/requestBlock/headerRequestGeneral.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown} from "@fortawesome/free-solid-svg-icons";


class HeaderRequestBlock extends React.Component {
	state = {
		dataPosition: 0,
		isOpenDropdownMethod: false,
		isSelectCollectionOpen: false
	};

	async componentDidMount() {
		const response = await fetch(`http://127.0.0.1:8000/collections/get_collections`);
		const json = await response.json();
		this.setState({collections: json.collection});
	}

	handleClick(method) {
		this.props.editRequestMethod(method);
		this.setState({isOpenDropdownMethod: false});
	}

	changeRequestUrlInput(url) {
		this.props.editRequestUrl(url);
	};

	async selectCollection(collection) {
		if (this.props.url === '') {
			this.props.showError('Request URL is empty');
			this.setState({isSelectCollectionOpen: false})
			document.querySelector('.urlInputSaveButton').style.pointerEvents = 'none';
				const timer = setTimeout(() => {
					document.querySelector('.urlInputSaveButton').style.pointerEvents = 'auto';
				}, 2500);
				return () => clearTimeout(timer);
		} else {
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
			this.setState({isSelectCollectionOpen: false})
		}
	}

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

		async function openCollectionsWindow() {
			if (_this.state.isSelectCollectionOpen === false) {
				_this.setState({isSelectCollectionOpen: true});
			} else {
				_this.setState({isSelectCollectionOpen: false})
			}
		}

		async function sendRequest() {
			let InputUrl = document.querySelector('.urlInputTextInput').value;
			if (InputUrl === '') {
				_this.props.showError('Request URL is empty');
				document.querySelector('.urlInputSendButton').style.pointerEvents = 'none';
				const timer = setTimeout(() => {
					document.querySelector('.urlInputSendButton').style.pointerEvents = 'auto';
				}, 2500);
				return () => clearTimeout(timer);
			} else {
				let requestBody = {
					url: InputUrl,
					method: _this.props.method,
					env: ''
				};

				if (_this.props.headers.length - 1 > 0) {
					let requestHeaders = {};
					_this.props.headers.map(function (item) {
						if (item.key !== '' && item.value !== '') {
							requestHeaders[item.key] = item.value
						}
					});
					requestBody.headers = requestHeaders;
				}
				if (_this.props.body !== null) {
					requestBody.body = _this.props.body
				}

				const response = await fetch('http://127.0.0.1:8000/req/', {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},

					body: JSON.stringify(requestBody)
				});
				const json = await response.json();
				_this.props.updateResponse(json);
				console.log({
					id: json.requestData.id,
					method: json.requestData.method,
					url: json.requestData.url,
					header: json.requestData.headers,
					body: json.requestData.body,
					time: json.requestData.time,
				});
				_this.props.updateNewResponseRequestDataHistory({
					id: json.requestData.id,
					method: json.requestData.method,
					url: json.requestData.url,
					headers: json.requestData.headers,
					body: json.requestData.body,
					time: json.requestData.time,
				})

			}
		}

		return (
			<div className='headerRequestBlock'>
				<div className='headerRequestBlockEnvironment'>

				</div>
				<div className='urlInputMethod row'>
					<div>
						<div className='dropdownMethod headerRequestBlockDropdownMethod d-flex justify-content-around'
						     onClick={openDropdown}>
							{this.props.method}
							<FontAwesomeIcon icon={faCaretDown} className='requestAdditionalButton'/>
						</div>
						{this.state.isOpenDropdownMethod &&
						<div className='dropdownList headerRequestBlockDropdownList'>
							{reqMethodList.map(method =>
								<div key={method} onClick={() => this.handleClick(method)}
								     className='dropdownItem'>{method}</div>
							)}
						</div>
						}
					</div>
					<div className='urlInputBlock'>
						<input type="text" className='urlInputTextInput' value={this.props.url}
						       onChange={e => this.changeRequestUrlInput(e.target.value)}
						/>
					</div>
					<div className='urlInputSendButton' onClick={sendRequest}>
						Send
					</div>

					<div className='urlInputSaveButtonBlock'>
						<div className='urlInputSaveButton' onClick={openCollectionsWindow}>
							Save
						</div>
						{(this.state.isSelectCollectionOpen) ?
							<div className='requestRowCollections'>
								<div className='requestRowCollectionsHeader'>Select collection</div>
								{this.state.collections.map(collection =>
									<div key={collection.id} onClick={() => this.selectCollection(collection.id)}
									     className='requestRowCollectionsItem'>{collection.name}</div>
								)}
							</div> : ''
						}
					</div>
				</div>

				<div className='requestData'>

				</div>
			</div>
		);
	}
}

export default HeaderRequestBlock;