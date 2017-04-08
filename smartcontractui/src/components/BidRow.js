import React from 'react';

class BidRow extends React.Component {
  constructor(props){
    super(props);
    this.props = props;
  }

  render () {
    return ( <tr>
      <td>{this.props.contractId}</td>
      <td>{this.props.suppliers}</td>
      <td>{this.props.prices}</td>
      <td>{this.props.timesToComplete}</td>
    </tr> );
  }

}
