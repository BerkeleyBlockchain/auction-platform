import React from "react";
import BiddingForm from "./BiddingForm";
import ReactModal from "react-modal";
import ScrollLock from "react-scrolllock";

class BidModal extends React.Component {
    constructor() {
        super();
        this.state = {
            showBidModal: false
        };

        this.handleOpenBidModal = this.handleOpenBidModal.bind(this);
        this.handleCloseBidModal = this.handleCloseBidModal.bind(this);
    }

    handleOpenBidModal() {
        this.setState({showBidModal: true});
    }

    handleCloseBidModal() {
        this.setState({showBidModal: false});
    }

    render() {
        return (
            <div>
                <button className="modal" onClick={this.handleOpenBidModal}>New Bid</button>
                <ReactModal
                    isOpen={this.state.showBidModal}
                    contentLabel="Bid Form"
                    className="container bloo all-modal">
                    <BiddingForm/>
                    <button className="modalDone" onClick={this.handleCloseBidModal}>Done</button>
                    <ScrollLock />
                </ReactModal>
            </div>
        );
    }
}
export default BidModal;
