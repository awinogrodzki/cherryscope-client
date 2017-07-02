import React from 'react';
import modalService from 'services/modal';
import Modal from 'components/Modal';

class ModalStack extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modals: [],
    };

    modalService.setChangeListener(modals => this.setState({ modals }));
  }

  render() {
    return (
      <div>
        { this.state.modals.map(modal => (
          <Modal key={modal.getId()} onClose={() => modalService.removeModal(modal)}>
            {modal.getComponent()}
          </Modal>
        )) }
      </div>
    );
  }
}

export default ModalStack;
