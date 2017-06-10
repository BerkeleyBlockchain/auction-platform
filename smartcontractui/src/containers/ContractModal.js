import React from "react";
import FormContainer from "./FormContainer";
import ReactModal from "react-modal";
import ScrollLock from "react-scrolllock";


class ContractModal extends React.Component {
    constructor() {
        super();
        this.state = {
            showContractModal: false
        };

        this.handleOpenContractModal = this.handleOpenContractModal.bind(this);
        this.handleCloseContractModal = this.handleCloseContractModal.bind(this);
    }

    handleOpenContractModal() {
        this.setState({showContractModal: true});
    }

    handleCloseContractModal() {
        this.setState({showContractModal: false});
    }

    render() {
        return (
            <div>
                <button className="modal" onClick={this.handleOpenContractModal}>New Contract</button>
                <ReactModal
                    isOpen={this.state.showContractModal}
                    contentLabel="Contract Form"
                    className="container bloo all-modal tablePad">
                    <FormContainer/>
                    <button className="modalDone" onClick={this.handleCloseContractModal}>Done</button>
                    <ScrollLock />
                </ReactModal>
            </div>
        );
    }
}
export default ContractModal;
