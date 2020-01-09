import React from "react";


class modalSelectCollectionRow extends React.Component {
  render() {

  	if (this.props.selectedCollection === true){
  		return (
            <div className='collectionItem collectionItemSelected' id={this.props.collectionName}>{this.props.collectionName}</div>
        );
    } else {
  	    return (
            <div className='collectionItem' id={this.props.collectionName} onClick={() => { this.props.changeSelectedCollection(this.props.id, this.props.collectionName)}}>{this.props.collectionName}</div>
        );
    }
  }
}

export default modalSelectCollectionRow;