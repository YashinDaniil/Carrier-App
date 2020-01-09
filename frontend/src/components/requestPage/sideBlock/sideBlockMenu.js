import React from 'react';
import '../../../css/sideBlock/sideBar.css'


class SideBlockMenu extends React.Component {
    render() {
    return (
      <div className='sideBlock'>
        <div className='sideBlockMenu row'>
              <div className='sideBlockMenuItem selectMenuItem' onClick={this.props.updateHistoryPosition}>History</div>
              <div className='sideBlockMenuItem' onClick={this.props.updateCollectionPositiony}>Collection</div>
              <div className='sideBlockMenuItem' onClick={this.props.updateEnvironmentPosition}>Environment</div>
        </div>

      </div>
    );
  }
}

export default SideBlockMenu;