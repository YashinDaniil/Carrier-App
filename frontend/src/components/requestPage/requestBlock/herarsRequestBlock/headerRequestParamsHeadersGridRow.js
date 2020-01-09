import React from 'react';
import '../../../../css/requstBlock/requestBlock/requestParamsBlock.css'
import {faCheckSquare, faTimes} from "@fortawesome/free-solid-svg-icons";
import {faSquare} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class HeadersRequestParamsHeadersGridRow extends React.Component {
	render() {
		const _this = this;

		function changeRowField() {
			if ((document.querySelector('#requestParamsItemInputKey' + _this.props.id).value.length === 1 && document.querySelector('#requestParamsItemInputValue' + _this.props.id).value.length === 0 && document.querySelector('#requestParamsItemInputDescription' + _this.props.id).value.length === 0) ||
				(document.querySelector('#requestParamsItemInputKey' + _this.props.id).value.length === 0 && document.querySelector('#requestParamsItemInputValue' + _this.props.id).value.length === 1 && document.querySelector('#requestParamsItemInputDescription' + _this.props.id).value.length === 0) ||
				(document.querySelector('#requestParamsItemInputKey' + _this.props.id).value.length === 0 && document.querySelector('#requestParamsItemInputValue' + _this.props.id).value.length === 0 && document.querySelector('#requestParamsItemInputDescription' + _this.props.id).value.length === 1)
			) {
				if (document.querySelector('#requestParamsItemInputKey' + _this.props.id).value !== _this.props.itemKey) {
					_this.props.createHeadersRow(_this.props.id, 'key', document.querySelector('#requestParamsItemInputKey' + _this.props.id).value)
				} else {
					if (document.querySelector('#requestParamsItemInputValue' + _this.props.id).value !== _this.props.value) {
						_this.props.createHeadersRow(_this.props.id, 'value', document.querySelector('#requestParamsItemInputValue' + _this.props.id).value)
					} else {
						if (document.querySelector('#requestParamsItemInputDescription' + _this.props.id).value !== _this.props.description) {
							_this.props.createHeadersRow(_this.props.id, 'desc', document.querySelector('#requestParamsItemInputDescription' + _this.props.id).value)
						}
					}
				}
			} else {
				if (document.querySelector('#requestParamsItemInputKey' + _this.props.id).value !== _this.props.itemKey) {
					_this.props.updateHeadersRow(_this.props.id, 'key', document.querySelector('#requestParamsItemInputKey' + _this.props.id).value)
				} else {
					if (document.querySelector('#requestParamsItemInputValue' + _this.props.id).value !== _this.props.value) {
						_this.props.updateHeadersRow(_this.props.id, 'value', document.querySelector('#requestParamsItemInputValue' + _this.props.id).value)
					} else {
						if (document.querySelector('#requestParamsItemInputDescription' + _this.props.id).value !== _this.props.description) {
							_this.props.updateHeadersRow(_this.props.id, 'desc', document.querySelector('#requestParamsItemInputDescription' + _this.props.id).value)
						}
					}
				}
			}
		}

		function deleteHeaderRowItem() {
			_this.props.deleteHeaderItem(_this.props.id)
		}

		function changeActive() {
			_this.props.updateHeadersRow(_this.props.id, 'active', (_this.props.active === true) ? false : true)
		}

		function onFocusKey() {
			document.querySelector('#requestParamsItemHeadersBodyGrid' + _this.props.id).style.backgroundColor = '#f1f1f1';
			document.querySelector('#requestParamsItemInputKey' + _this.props.id).style.backgroundColor = '#FFF';
			document.querySelector('#requestParamsItemInputValue' + _this.props.id).style.backgroundColor = '#f1f1f1';
			document.querySelector('#requestParamsItemInputDescription' + _this.props.id).style.backgroundColor = '#f1f1f1';
		}

		function onFocusValue() {
			document.querySelector('#requestParamsItemHeadersBodyGrid' + _this.props.id).style.backgroundColor = '#f1f1f1';
			document.querySelector('#requestParamsItemInputKey' + _this.props.id).style.backgroundColor = '#f1f1f1';
			document.querySelector('#requestParamsItemInputValue' + _this.props.id).style.backgroundColor = '#FFF';
			document.querySelector('#requestParamsItemInputDescription' + _this.props.id).style.backgroundColor = '#f1f1f1';
		}

		function onFocusDescription() {
			document.querySelector('#requestParamsItemHeadersBodyGrid' + _this.props.id).style.backgroundColor = '#f1f1f1';
			document.querySelector('#requestParamsItemInputKey' + _this.props.id).style.backgroundColor = '#f1f1f1';
			document.querySelector('#requestParamsItemInputValue' + _this.props.id).style.backgroundColor = '#f1f1f1';
			document.querySelector('#requestParamsItemInputDescription' + _this.props.id).style.backgroundColor = '#FFF';
		}

		function onBlur() {
			document.querySelector('#requestParamsItemHeadersBodyGrid' + _this.props.id).style.backgroundColor = '#FFF';
			document.querySelector('#requestParamsItemInputKey' + _this.props.id).style.backgroundColor = '#FFF';
			document.querySelector('#requestParamsItemInputValue' + _this.props.id).style.backgroundColor = '#FFF';
			document.querySelector('#requestParamsItemInputDescription' + _this.props.id).style.backgroundColor = '#FFF';
		}


		return (
			<div className='requestParamsItemHeadersBodyGrid row'
			     id={'requestParamsItemHeadersBodyGrid' + this.props.id}>
				<div className='requestParamsItemHeadersBodyGridItem col-1 d-flex justify-content-center'>
					{(this.props.available) ?
						((this.props.active) ?
							<FontAwesomeIcon icon={faCheckSquare} className='requestParamsItemHeadersCheck'
							                 onClick={changeActive}/> :
							<FontAwesomeIcon icon={faSquare} className='requestParamsItemHeadersCheck'
							                 onClick={changeActive}/>) : ''
					}
				</div>
				<div className='requestParamsItemHeadersBodyGridItem col'>
					<input type="text"
					       className='requestParamsItemHeadersBodyGridItemInput requestParamsItemInputKey'
					       id={'requestParamsItemInputKey' + this.props.id}
					       placeholder='Key'
					       disabled={this.props.isDisabled}
					       onChange={changeRowField}
					       onFocus={onFocusKey}
					       onBlur={onBlur}
					       value={this.props.itemKey}
					       style={(this.props.active) ? {color: '#000'} : {color: '#bdbdbd'}}
					/></div>
				<div className='requestParamsItemHeadersBodyGridItem col'>
					<input type="text"
					       className='requestParamsItemHeadersBodyGridItemInput requestParamsItemInputValue'
					       id={'requestParamsItemInputValue' + this.props.id}
					       placeholder='Value'
					       disabled={this.props.isDisabled}
					       onChange={changeRowField}
					       onFocus={onFocusValue}
					       onBlur={onBlur}
					       value={this.props.value}
					       style={(this.props.active) ? {color: '#000'} : {color: '#bdbdbd'}}
					/></div>
				{(this.props.isDisabled) ? '' :
					<div className='requestParamsItemHeadersBodyGridItem col'>
						<input type="text"
						       className='requestParamsItemHeadersBodyGridItemInput requestParamsItemInputDescription'
						       id={'requestParamsItemInputDescription' + this.props.id}
						       placeholder='Description'
						       disabled={this.props.isDisabled}
						       onChange={changeRowField}
						       onFocus={onFocusDescription}
						       onBlur={onBlur}
						       value={this.props.description}
						       style={(this.props.active) ? {color: '#000'} : {color: '#bdbdbd'}}
						/>
						{(this.props.available) ?
							<FontAwesomeIcon icon={faTimes} className='requestParamsItemHeadersCheck'
							                 onClick={deleteHeaderRowItem}/> : ''
						}

					</div>
				}
			</div>
		);
	}
}

export default HeadersRequestParamsHeadersGridRow;