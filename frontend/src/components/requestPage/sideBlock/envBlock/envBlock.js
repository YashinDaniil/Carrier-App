import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import {faWindowClose} from "@fortawesome/free-solid-svg-icons";

import SelectCollection from '../../modal/modalSelectCollection'
import EnvBlockRow from './envBlockRow'

import '../../../../css/sideBlock/env_block/envBlock.css'

class EnvBlock extends React.Component {
	state = {
		envList: [],
		collections: [],
		selectCollection: -1,
		isError: '',
		isOpenCreateEnv: false
	};

	async componentDidMount() {
		const response = await fetch(`http://127.0.0.1:8000/collections/get_env`);
		const json = await response.json();
		this.setState({envList: json.env});

		const responseCollection = await fetch(`http://127.0.0.1:8000/collections/get_collections`);
		const jsonCollection = await responseCollection.json();
		this.setState({collections: jsonCollection.collection});
	}

	changeCollection = (collectionItemId, collectionName) => {
		this.setState({
			selectCollection: collectionItemId,
		});
	};

	deleteEnv = (envId) => {
		this.setState({
			envList: this.state.envList.filter(function (env) {
				return env.env_id !== envId
			})
		});
	};

	render() {
		const _this = this;

		function showCreateEnv() {
			if(_this.state.isOpenCreateEnv === false){
				_this.setState({isOpenCreateEnv: true});
			} else {
				_this.setState({isOpenCreateEnv: false});
			}
		}

		async function createEnv() {
			if (_this.state.selectCollection !== -1 && document.querySelectorAll('.envCreateBlockInput')[0].value !== '' && document.querySelectorAll('.envCreateBlockInput')[1].value !== ''){
				_this.setState({isError: ''});
				const response = await fetch('http://127.0.0.1:8000/collections/add_env/', {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						name: document.querySelectorAll('.envCreateBlockInput')[0].value,
						url: document.querySelectorAll('.envCreateBlockInput')[1].value,
						collection_id: _this.state.selectCollection
					})
				});
				const json = await response.json();
				if (json.status === 'ok'){
					let newEnvItem = {
							env_id: json.env_id,
							env_name: json.env_name,
							url: json.url,
							collection_id: json.collection_id,
							collection_name: json.collection_name
					};
					_this.setState({envList: [..._this.state.envList, newEnvItem]});
					document.querySelectorAll('.envCreateBlockInput')[0].value = '';
					document.querySelectorAll('.envCreateBlockInput')[0].value = '';
					_this.setState({selectCollection: -1});
					_this.setState({isOpenCreateEnv: false});
				}
			} else {
				_this.setState({isError: 'Please fill in all fields'})
			}
		}

		let envListBlock = _this.state.envList.map((envItem) =>
			<EnvBlockRow
				envId = {envItem.env_id}
				envName = {envItem.env_name}
				envUrl = {envItem.url}
				collectionId = {envItem.collection_id}
				collectionName = {envItem.collection_name}
				deleteEnv = {this.deleteEnv}
			/>

		)

		return (
			<div>
				<div className='envHeaderBlock'>
					<div className='d-flex flex-row'>
						{(this.state.isOpenCreateEnv) ?
							<div className='envyHeaderAddEnv' onClick={showCreateEnv}>
								<FontAwesomeIcon icon={faWindowClose}/>
								<span className='envyHeaderAddEnvTitle'>Close</span>
							</div> :
							<div className='envyHeaderAddEnv' onClick={showCreateEnv}>
								<FontAwesomeIcon icon={faPlusSquare}/>
								<span className='envyHeaderAddEnvTitle'>Add Env</span>
							</div>
						}
					</div>
				</div>
				{(this.state.isOpenCreateEnv) ?
					<div className='envCreateBlock'>
						<div>
							<div className='envCreateBlockInputLabel'>Env Name</div>
							<input type="text" className='envCreateBlockInput'/>
						</div>

						<div>
							<div className='envCreateBlockInputLabel'>Env Url</div>
							<input type="text" className='envCreateBlockInput'/>
						</div>

						<div>
							<div className='envCreateBlockInputLabel'>Collection</div>
							<div className='envCreateBlockListCollections'>
								<SelectCollection
									collections={this.state.collections}
									changeCollection={this.changeCollection}
									selectCollectionItem={this.state.selectCollection}
								/>
							</div>
						</div>
						<div className='envCreateBlockButton' onClick={createEnv}>Create Env</div>
						<div className='envCreateBlockError'>{this.state.isError}</div>
					</div> : ''
				}
				{envListBlock}
			</div>
		);
	}
}

export default EnvBlock;