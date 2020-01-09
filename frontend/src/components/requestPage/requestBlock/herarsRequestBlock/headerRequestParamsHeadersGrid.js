import React from 'react';
import HeadersRequestParamsHeadersGridRow from './headerRequestParamsHeadersGridRow'
import '../../../../css/requstBlock/requestBlock/requestParamsBlock.css'


class HeadersRequestParamsHeadersGrid extends React.Component {
	createHeadersRow = (id, key, value) => {
		this.props.createHeaders(id, key, value)
	};

	updateHeadersRow = (id, key, value) => {
		this.props.updateHeaders(id, key, value)
	};

	deleteHeaderItem = (key) => {
		this.props.deleteHeader(key)
	};

	render() {

		return (
			<div>
				<div className='requestParamsItemHeadersTopGrid row'>
					<div className='requestParamsItemHeadersTopGridItem col-1'></div>
					<div className='requestParamsItemHeadersTopGridItem col'>Key</div>
					<div className='requestParamsItemHeadersTopGridItem col'>Value</div>
					{(this.props.isDisabled) ? '' :
						<div className='requestParamsItemHeadersTopGridItem col'>Description</div>
					}
				</div>
				{this.props.headersItems.map((headerItem) =>
					<HeadersRequestParamsHeadersGridRow
						id={headerItem.id}
						itemKey={headerItem.key}
						value={headerItem.value}
						description={headerItem.desc}
						active={headerItem.active}
						available={headerItem.available}
						createHeadersRow={this.createHeadersRow}
						updateHeadersRow={this.updateHeadersRow}
						deleteHeaderItem={this.deleteHeaderItem}
						isDisabled={this.props.isDisabled}
					/>
				)}
			</div>
		);
	}
}

export default HeadersRequestParamsHeadersGrid;