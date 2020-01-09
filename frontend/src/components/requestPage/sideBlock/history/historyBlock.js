import React from 'react';
import HistoryRow from './historyRow'
import '../../../../css/sideBlock/history/historyBlock.css'
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


class HistoryBlock extends React.Component {
	state = {
		reqList: []
	};

	async componentDidMount() {
		const response = await fetch(`http://127.0.0.1:8000/req/list`);
		const json = await response.json();
		this.setState({reqList: json.reqList});
	}

	changeRequestDataHistoryRow = (data) => {
		this.props.changeRequestDataHistory(data)
	};

	deleteCollection = (collection) => {
		this.setState({
			reqList: this.state.reqList.filter(function (req) {
				return req.id !== collection
			})
		});
	};

	render() {
		const _this = this;

		if (_this.props.newResponseRequestData !== null){
			console.log(_this.props.newResponseRequestData);
			let newReqList = _this.state.reqList;
			newReqList.unshift(_this.props.newResponseRequestData);
			console.log(newReqList);
			_this.setState({reqList: newReqList});
			_this.props.updateNewResponseRequestDataReq(null);
		}

		const historyRequestList = this.state.reqList.map((requestCell) =>
			<HistoryRow
				id={requestCell.id}
				method={requestCell.method}
				url={requestCell.url}
				header={requestCell.headers}
				body={requestCell.body}
				time={requestCell.time}
				deleteColl={this.deleteCollection}
				changeRequestDataHistoryRow={this.changeRequestDataHistoryRow}
			/>
		);

		async function clearRequestsHistory() {
			const response = await fetch('http://127.0.0.1:8000/req/clear_history/', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
			});
			const json = await response.json();
			if (json.status === 'All history was deleted') {
				_this.setState({reqList: []})
			}
		}

		return (
			<div>
				<div className='historyHeaderBlock'>
					<div className='d-flex flex-row-reverse'>
						<div className='historyHeaderCleanHistory' onClick={clearRequestsHistory}>
							<FontAwesomeIcon icon={faTrash}/>
							<span className='historyHeaderCleanHistoryTitle'>Clear</span>
						</div>
					</div>
				</div>
				<div className='historyBlockList'>
					{historyRequestList}
				</div>
			</div>
		);
	}
}

export default HistoryBlock;
