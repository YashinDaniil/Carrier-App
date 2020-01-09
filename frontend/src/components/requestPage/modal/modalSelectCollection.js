import React from "react";
import ModalSelectCollectionRow from './modalSelectCollectionRow'
import '../../../css/sideBlock/modal/modalSelectCollection.css'

//<div className='collectionItem' key={collectionItem.id} id={collectionItem.name} onClick={() => this.changeCollection(collectionItem)}>{collectionItem.name}</div>

class ModalSelectConnection extends React.Component {
	changeSelectedCollection = (collectionItemId, collectionName) => {
		this.props.changeCollection(collectionItemId, collectionName)
	};

	render() {
		return (
			<div className='collectionBlockList'>
				{this.props.collections.map(collectionItem =>
					<ModalSelectCollectionRow
						key={collectionItem.id}
						id={collectionItem.id}
						collectionName={collectionItem.name}
						selectedCollection={(collectionItem.id === this.props.selectCollectionItem) ? true : false}
						changeSelectedCollection={this.changeSelectedCollection}
					/>
				)}
			</div>
		);
	}
}

export default ModalSelectConnection;