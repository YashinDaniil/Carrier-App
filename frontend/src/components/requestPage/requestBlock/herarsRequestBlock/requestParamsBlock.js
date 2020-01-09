import React from 'react';

import {faCaretRight, faTrash} from "@fortawesome/free-solid-svg-icons";
import {faCaretDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import HeadersRequestParamsHeadersGrid from './headerRequestParamsHeadersGrid';
import BodyRequestBlock from './bodyRequestBlock'

import '../../../../css/requstBlock/requestBlock/requestParamsBlock.css'


class RequestParamsBlock extends React.Component {
	state = {
		paramsItem: 0,
		isOpenHeaders: true,
		url: '',
		method: null,
		headers: [{
			id: 0,
			key: '',
			value: '',
			desc: '',
			active: false,
			available: false,
		}],
		headersCounter: 0,
		isOpenBody: false,
		body: null,
		env: '',
		response: null
	};

	onEditRequestBody = (e) => {
		this.props.editRequestBody(e);
	};

	onDeleteRequestBody = (e) => {
		this.props.deleteRequestBody(e);
	};

	onAddRequestBody = (e) => {
		this.props.addRequestBody(e);
	};

	createHeaders = (id, key, value) => {
		let updateHeaders = this.props.headers;
		let headerItem = {
			id: this.state.headersCounter + 1,
			key: '',
			value: '',
			desc: '',
			active: false,
			available: false,
		};
		for (let i in updateHeaders) {
			if (updateHeaders[i].id === id) {
				updateHeaders[i].active = true;
				updateHeaders[i].available = true;
				console.log(updateHeaders);
				switch (key) {
					case 'key':
						updateHeaders[i].key = value;
						break;
					case 'value':
						updateHeaders[i].value = value;
						break;
					case 'desc':
						updateHeaders[i].desc = value;
						break;
				}
				break;
			}
		}
		updateHeaders.push(headerItem);
		this.props.updateHeaders(updateHeaders);
		this.setState({headers: updateHeaders, headersCounter: this.state.headersCounter + 1})
	};

	updateHeaders = (id, key, value) => {
		let updateHeaders = this.props.headers;
		for (let i in updateHeaders) {
			if (updateHeaders[i].id === id) {
				switch (key) {
					case 'key':
						updateHeaders[i].key = value;
						break;
					case 'value':
						updateHeaders[i].value = value;
						break;
					case 'desc':
						updateHeaders[i].desc = value;
						break;
					case 'active':
						updateHeaders[i].active = value
						break;

				}
				break;
			}
		}
		this.props.updateHeaders(updateHeaders);
		this.setState({headers: updateHeaders})
	};

	deleteHeader = (id) => {
		console.log(this.props.headers);
		let newData = this.props.headers.filter(function (headerItem) {
			return headerItem.id !== id
		});
		this.props.updateHeaders(this.props.headers.filter(function (headerItem) {
			return headerItem.id !== id
		}));
		this.setState({
			headers: this.props.headers.filter(function (headerItem) {
				return headerItem.id !== id
			})
		});
	};

	render() {
		const _this = this;

		function setHeadersParam() {
			_this.setState({paramsItem: 0});
		}

		function setBodyParam() {
			_this.setState({paramsItem: 1});
		}

		function hideOpenHeaders() {
			if (_this.state.isOpenHeaders === true) {
				_this.setState({isOpenHeaders: false})
			} else {
				_this.setState({isOpenHeaders: true})
			}
		}

		return (
			<div>
				<div className='requestParamsList row'>
					<div
						className={(this.state.paramsItem === 0) ? 'requestParamsItem requestParamsItemSelected' : 'requestParamsItem'}
						onClick={setHeadersParam}>Headers
					</div>
					<div
						className={(this.state.paramsItem === 1) ? 'requestParamsItem requestParamsItemSelected' : 'requestParamsItem'}
						onClick={setBodyParam}>Body
					</div>
				</div>

				{(this.state.paramsItem === 0) ?
					<div>
						<div className='requestParamsItemAdditional row'>
							{(this.state.isOpenHeaders) ?
								<FontAwesomeIcon icon={faCaretDown} className='requestParamsHeadersCaret'
								                 onClick={hideOpenHeaders}/> :

								<FontAwesomeIcon icon={faCaretRight} className='requestParamsHeadersCaret'
								                 onClick={hideOpenHeaders}/>
							}
							<div className='requestParamsItemLabel'>Headers</div>
							<div className='requestParamsItemCounter'>({this.state.headers.length - 1})</div>
							{(this.state.isOpenHeaders) ?
								'' :
								<hr style={{width: '100vw', marginLeft: '-30px'}}/>
							}
						</div>

						{(this.state.isOpenHeaders === true) ?
							<HeadersRequestParamsHeadersGrid
								headersItems={this.props.headers}
								createHeaders={this.createHeaders}
								updateHeaders={this.updateHeaders}
								deleteHeader={this.deleteHeader}
								isDisabled={false}
							/>
							: ''
						}
					</div> : ''
				}

				{(this.state.paramsItem === 1) ?
					<BodyRequestBlock
						onEditRequestBody={this.onEditRequestBody}
						onDeleteRequestBody={this.onDeleteRequestBody}
						onAddRequestBody={this.onAddRequestBody}
						body={this.props.body}
					/>
					: ''
				}

			</div>
		);
	}
}

export default RequestParamsBlock;