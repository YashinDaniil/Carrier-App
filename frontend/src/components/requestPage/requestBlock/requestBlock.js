import React from 'react';
import '../../../css/requstBlock/requestBlock/headerRequestGeneral.css'
import HeaderRequestBlock from './herarsRequestBlock/headerRequestBlock'
import ParamsRequestBlock from './herarsRequestBlock/requestParamsBlock'
import ErrorMessage from './errorMessage'
import ResponseBlock from '../responseBlock/responseBlock'


class requestBlockGeneral extends React.Component {
	state = {
		url: '',
		method: 'GET',
		headers: [{
			id: 0,
			key: '',
			value: '',
			desc: '',
			active: false,
			available: false,
		}],
		body: null,
		response: null,

		isError: false,
		errorMessage: '',
	};

	editRequestUrl = (url) => {
		this.setState({url: url})
	};

	editRequestMethod = (method) => {
		this.setState({method: method})
	};

	editRequestBody = (e) => {
		this.setState({body: e.updated_src});
	};

	deleteRequestBody = (e) => {
		this.setState({body: e.updated_src});
	};

	addRequestBody = (e) => {
		this.setState({body: e.updated_src});
	};

	updateHeaders = (newHeaders) => {
		this.setState({headers: newHeaders});
	};

	updateResponse = (response) => {
		this.setState({response: response})
	};

	showError = (message) => {
		this.setState({errorMessage: message});
		this.setState({isError: true});

		let start = Date.now();

		let animationTimer = setInterval(function () {
			let timePassed = Date.now() - start;
			document.querySelector('.errorMessage').style.right = timePassed + 'px';
			document.querySelector('.errorMessage').style.opacity = timePassed / 3 + '%';

			if (timePassed > 310) clearInterval(animationTimer);

		}, 2);

		const _this = this;
		const timer = setTimeout(() => {
			let start = Date.now();
			let animationTimer = setInterval(function () {
				let timePassed = Date.now() - start;
				document.querySelector('.errorMessage').style.opacity = 100 - timePassed / 3 + '%';

				if (timePassed > 300) {
					clearInterval(animationTimer);
					_this.setState({errorMessage: ''});
					_this.setState({isError: false});
				}

			}, 2);
		}, 2000);
		return () => clearTimeout(timer);
	};

	updateNewResponseRequestDataHistory = (data) => {
		this.props.updateResponseRequestData(data)
	};

	render() {
		const _this = this;
		if (_this.props.requestData !== null) {
			_this.setState({url: _this.props.requestData.url});
			_this.setState({method: _this.props.requestData.method});
			if (_this.props.requestData.body === '') {
				_this.setState({body: {}});
			} else {
				_this.setState({body: _this.props.requestData.body});
			}
			if (_this.props.requestData.header === '') {
				_this.setState({headers: [{id: 0, key: '', value: '', desc: '', active: false, available: false}]})
			} else {
				let counter = -1;
				let headersData = Object.keys(_this.props.requestData.header).map(function (key, index) {
					return {
						id: ++counter,
						key: key,
						value: _this.props.requestData.header[key],
						desc: '',
						active: true,
						available: true,
					}
				});
				console.log(headersData);
				headersData.push({id: ++counter, key: '', value: '', desc: '', active: false, available: false})
				_this.setState({headers: headersData})
			}
			_this.props.changeRequestData(null);
		}

			return (
				<div className='requestBlock'>
					{(this.state.isError) ?
						<ErrorMessage
							errorMessage={this.state.errorMessage}
						/> : ''
					}
					<HeaderRequestBlock
						url={this.state.url}
						method={this.state.method}
						editRequestUrl={this.editRequestUrl}
						editRequestMethod={this.editRequestMethod}
						headers={this.state.headers}
						body={this.state.body}
						updateResponse={this.updateResponse}
						showError={this.showError}
						updateNewResponseRequestDataHistory={this.updateNewResponseRequestDataHistory}
					/>
					<ParamsRequestBlock
						headers={this.state.headers}
						body={this.state.body}
						updateHeaders={this.updateHeaders}
						editRequestBody={this.editRequestBody}
						deleteRequestBody={this.deleteRequestBody}
						addRequestBody={this.addRequestBody}
					/>

					<ResponseBlock
						response={this.state.response}
					/>


				</div>
			);
		}
	}

	export default requestBlockGeneral;