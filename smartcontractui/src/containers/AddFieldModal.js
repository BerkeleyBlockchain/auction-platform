import React from 'react';
import AddFieldForm from './AddFieldForm';
import ReactModal from 'react-modal';
import ScrollLock from 'react-scrolllock';

class AddFieldModal extends React.Component {
    constructor() {
        super();
        this.state = {
            showAddFieldModal: false
        };

        this.handleOpenAddFieldModal = this.handleOpenAddFieldModal.bind(this);
        this.handleCloseAddFieldModal = this.handleCloseAddFieldModal.bind(this);
    }

    handleOpenAddFieldModal() {
        this.setState({showAddFieldModal: true});
    }

    handleCloseAddFieldModal() {
        this.setState({showAddFieldModal: false});
    }

    render() {
        return (
            <div>
                <button className="addForm" onClick={this.handleOpenAddFieldModal}>Add Contract Field</button>
                <ReactModal
                    isOpen={this.state.showAddFieldModal}
                    contentLabel="AddField Form"
                    className="container bloo">
                    <AddFieldForm/>
                    <button className="addFormDone" onClick={this.handleCloseAddFieldModal}>Done</button>
                    <ScrollLock />
                </ReactModal>
            </div>
        );
    }
}
export default AddFieldModal;
