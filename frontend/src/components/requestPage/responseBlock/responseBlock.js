import React from 'react';
import JSONPretty from 'react-json-prettify';
import {github} from 'react-json-prettify/dist/themes';
import HeaderGrid from '../requestBlock/herarsRequestBlock/headerRequestParamsHeadersGrid';
import EmptyResponse from '../../../img/responseBlock/responseEmpty.svg'

import '../../../css/requstBlock/responseBlock/responseBlock.css'

class ResponseBlock extends React.Component {
	state = {
		paramsItem: 0,
		headers: [],
	};

	render() {
		const _this = this;

		function setHeadersParam() {
			_this.setState({paramsItem: 0});
		}

		function setBodyParam() {
			_this.setState({paramsItem: 1});
		}


		function hasJsonStructure(str) {
			if (typeof str !== 'string') return false;
			try {
				const result = JSON.parse(str);
				const type = Object.prototype.toString.call(result);
				return type === '[object Object]'
					|| type === '[object Array]';
			} catch (err) {
				return false;
			}
		}

		return (
			<div className='responseBlock'>
				<div className='responseBlockHeader'>
					{(this.props.response === null ||this.props.response.request_status === 'error') ?
						'Response' :
						<div className='responseBlockHeaderResponse row justify-content-between'>
							<div className='responseBlockHeaderResponseButton row'>
								<div
									className={(this.state.paramsItem === 0) ? 'requestParamsItem requestParamsItemSelected' : 'requestParamsItem'}
									onClick={setHeadersParam}>Headers
								</div>
								<div
									className={(this.state.paramsItem === 1) ? 'requestParamsItem requestParamsItemSelected' : 'requestParamsItem'}
									onClick={setBodyParam}>Body
								</div>
							</div>

							<div className='responseBlockHeaderResponseInfo row align-self-center'>
								<div className='responseBlockHeaderResponseInfoItem row'>
									<div className='responseBlockHeaderResponseInfoItemTitle'>Status:</div>
									<div
										className='responseBlockHeaderResponseInfoItemValue'>{this.props.response.status_code}</div>
								</div>
								<div className='responseBlockHeaderResponseInfoItem row'>
									<div className='responseBlockHeaderResponseInfoItemTitle'>Time:</div>
									<div
										className='responseBlockHeaderResponseInfoItemValue'>{this.props.response.time} ms
									</div>
								</div>
								<div className='responseBlockHeaderResponseInfoItem row'>
									<div className='responseBlockHeaderResponseInfoItemTitle'>Size:</div>
									<div
										className='responseBlockHeaderResponseInfoItemValue'>{this.props.response.size} KB
									</div>
								</div>
							</div>
						</div>
					}

				</div>

				{(this.props.response !== null) ?
					(this.props.response.request_status === 'error') ?
						<div className='responseBlockContentError'>
							<div id='responseBlockContentErrorTitle'>Could not get any response</div>
							<div id='responseBlockContentErrorTitleTwo'>There was an error connecting.</div>
							<div id='responseBlockContentErrorTitleThree'>Why this might have happened:</div>
							<ul>
								<li className='responseBlockContentErrorListItem'>The server couldn't send a response: Ensure that the backend is working properly</li>
								<li className='responseBlockContentErrorListItem'>Self-signed SSL certificates are being blocked</li>
								<li className='responseBlockContentErrorListItem'>Request timeout</li>
							</ul>
						</div> :
						(this.state.paramsItem === 0) ?
							<div className='responseBlockContentHeader'>
								<HeaderGrid
									headersItems={
										Object.keys(_this.props.response.headers).map(function (key, index) {
											return {
												id: 'responseItem',
												key: key,
												value: _this.props.response.headers[key],
												desc: '',
												active: false,
												available: false,
											}
										})
									}
									isDisabled={true}
								/>
							</div> :
							<div className='responseBlockContentBody'>
								<JSONPretty theme={github} json={_this.props.response.content}/>
							</div>


					:
					<div className='responseBlockContentEmpty row justify-content-center'>
						<div className='col-12'>

						</div>
						<img src={EmptyResponse} alt="" className='responseBlockContentEmptyImg'/>
						<div className='responseBlockContentEmptyTitle col-12'>Hit Send to get a response</div>
					</div>
				}
			</div>
		);
	}
}

export default ResponseBlock;


