import React from 'react';
import '../../../../css/sideBlock/env_block/envBlockRow.css'

import {faCaretRight} from "@fortawesome/free-solid-svg-icons";
import {faCaretDown} from "@fortawesome/free-solid-svg-icons";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class EnvBlockRow extends React.Component {
	state = {
		isOpenAdditional: false
	};
	render() {
		const _this = this;

		function openAdditional() {
			if (_this.state.isOpenAdditional === false){
				_this.setState({isOpenAdditional: true})
			} else {
				_this.setState({isOpenAdditional: false})
			}
		}

        async function deleteEnv() {
	        const response = await fetch('http://127.0.0.1:8000/collections/delete_env/', {
	                method: 'POST',
	                headers: {
	                    'Accept': 'application/json',
	                    'Content-Type': 'application/json'
	                },
	                body: JSON.stringify(
	                    {
	                        id: _this.props.envId
	                    })
	              });
	          const json = await response.json();
	          _this.props.deleteEnv(_this.props.envId);
        }

		return (
			<div>
				<div className='envBlockRow row'>
					<div className='envBlockRowHover row' onClick={openAdditional}>
						<div className='envBlockCaret'>
							{(this.state.isOpenAdditional === false) ?
								<FontAwesomeIcon icon={faCaretRight}/> :
								<FontAwesomeIcon icon={faCaretDown}/>
							}
						</div>
						<div className='envBlockTitle col'>
							{this.props.envName}
						</div>
					</div>

					<div className='envBlockTrash' onClick={deleteEnv}>
						<FontAwesomeIcon icon={faTrash}/>
					</div>
					{(this.state.isOpenAdditional === true) ?
						<div className='envBlockRowAdditional'>
							<div className='envBlockRowAdditionalItem row'>
								<div className='envBlockRowAdditionalItemLabel col-6'>Env Id:</div>
								<div className='envBlockRowAdditionalItemInfo'>{this.props.envId}</div>
							</div>

							<div className='envBlockRowAdditionalItem row'>
								<div className='envBlockRowAdditionalItemLabel col-6'>Env Url:</div>
								<div className='envBlockRowAdditionalItemInfo envBlockRowAdditionalItemInfoWidth'>{this.props.envUrl}</div>
							</div>

							<div className='envBlockRowAdditionalItem row'>
								<div className='envBlockRowAdditionalItemLabel col-6'>Collection Id:</div>
								<div className='envBlockRowAdditionalItemInfo'>{this.props.collectionId}</div>
							</div>

							<div className='envBlockRowAdditionalItem row'>
								<div className='envBlockRowAdditionalItemLabel col-6'>Collection Name:</div>
								<div className='envBlockRowAdditionalItemInfo envBlockRowAdditionalItemInfoWidth'>{this.props.collectionName}</div>
							</div>
						</div> : ''
					}
				</div>
			</div>

		);
	}
}

export default EnvBlockRow;
