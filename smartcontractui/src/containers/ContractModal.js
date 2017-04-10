import React from 'react';
import FormContainer from './FormContainer';
import ReactModal from 'react-modal';

class ContractModal extends React.Component {
  constructor () {
    super();
    this.state = {
      showContractModal: false
    };

    this.handleOpenContractModal = this.handleOpenContractModal.bind(this);
    this.handleCloseContractModal = this.handleCloseContractModal.bind(this);
  }

  handleOpenContractModal () {
    this.setState({ showContractModal: true });
  }

  handleCloseContractModal () {
    this.setState({ showContractModal: false });
  }

  render () {
    return (
      <div>
        <button className="modal" onClick={this.handleOpenContractModal}>New Contract</button>
        <ReactModal
           isOpen={this.state.showContractModal}
           contentLabel="Contract Form">
          <FormContainer/>
          <button className="modalDone" onClick={this.handleCloseContractModal}>Done</button>
        </ReactModal>
      </div>
    );
  }
}
export default ContractModal;
