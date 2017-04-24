import React from 'react';
import GetContractBidsForm from './GetContractBidsForm.js';
import ReactModal from 'react-modal';
import ScrollLock from 'react-scrolllock';

class GetContractBidsModal extends React.Component {
  constructor () {
    super();
    this.state = {
      showAddFieldModal: false
    };

    this.handleOpenAddFieldModal = this.handleOpenAddFieldModal.bind(this);
    this.handleCloseAddFieldModal = this.handleCloseAddFieldModal.bind(this);
  }

  handleOpenAddFieldModal () {
    this.setState({ showAddFieldModal: true });
  }

  handleCloseAddFieldModal () {
    this.setState({ showAddFieldModal: false });
  }

  render () {
    return (
      <div>
        <button className="addForm" onClick={this.handleOpenAddFieldModal}>Get Contract Bids</button>
        <ReactModal
           isOpen={this.state.showAddFieldModal}
           contentLabel="AddField Form"
           className="container bloo">
          <GetContractBidsForm/>
          <button className="addFormDone" onClick={this.handleCloseAddFieldModal}>Done</button>
          <ScrollLock />
        </ReactModal>
      </div>
    );
  }
}
export default GetContractBidsModal;
