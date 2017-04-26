import React from "react";
import EditContractForm from "./EditContractForm";
import ReactModal from "react-modal";
import ScrollLock from "react-scrolllock";

class EditContractModal extends React.Component {
    constructor() {
        super();
        this.state = {
            showEditContractModal: false
        };

        this.handleOpenEditContractModal = this.handleOpenEditContractModal.bind(this);
        this.handleCloseEditContractModal = this.handleCloseEditContractModal.bind(this);
    }

    handleOpenEditContractModal() {
        this.setState({showEditContractModal: true});
    }

    handleCloseEditContractModal() {
        this.setState({showEditContractModal: false});
    }

    render() {
        return (
            <div>
                <button className="addForm" onClick={this.handleOpenEditContractModal}>Edit Contract</button>
                <ReactModal
                    isOpen={this.state.showEditContractModal}
                    contentLabel="Close Contract"
                    className="container bloo all-modal">
                    <EditContractForm/>
                    <button className="addFormDone" onClick={this.handleCloseEditContractModal}>Done</button>
                    <ScrollLock/>
                </ReactModal>
            </div>
        );
    }
}
export default EditContractModal;
