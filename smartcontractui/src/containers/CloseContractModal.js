import React from 'react';
import CloseContractForm from './CloseContractForm';
import ReactModal from 'react-modal';
import ScrollLock from 'react-scrolllock';

class CloseContractModal extends React.Component {
    constructor() {
        super();
        this.state = {
            showCloseContractModal: false
        };

        this.handleOpenCloseContractModal = this.handleOpenCloseContractModal.bind(this);
        this.handleCloseCloseContractModal = this.handleCloseCloseContractModal.bind(this);
    }

    handleOpenCloseContractModal() {
        this.setState({showCloseContractModal: true});
    }

    handleCloseCloseContractModal() {
        this.setState({showCloseContractModal: false});
    }

    render() {
        return (
            <div>
                <button className="addForm" onClick={this.handleOpenCloseContractModal}>Close Contract</button>
                <ReactModal
                    isOpen={this.state.showCloseContractModal}
                    contentLabel="Close Contract"
                    className="container bloo all-modal">
                    <CloseContractForm/>
                    <button className="addFormDone" onClick={this.handleCloseCloseContractModal}>Done</button>
                    <ScrollLock />
                </ReactModal>
            </div>
        );
    }
}
export default CloseContractModal;
