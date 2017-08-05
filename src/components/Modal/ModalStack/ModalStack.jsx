import React from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import modalService from 'services/modal';
import Modal from 'components/Modal';

class ModalStack extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modals: [],
    };

    modalService.addChangeListener(modals => this.setState({ modals }));
  }

  render() {
    const modals = this.state.modals.map((modal) => {
      const {
        animateFromElement,
        onClose,
      } = modal.getOptions();

      return (
        <Modal
          animateFromElement={animateFromElement}
          key={modal.getId()}
          onClose={() => {
            typeof onClose === 'function' && onClose();
            modalService.removeModal(modal);
          }}
        >
          {modal.getComponent()}
        </Modal>
      );
    });

    return (
      <TransitionGroup component="div">
        { modals }
      </TransitionGroup>
    );
  }
}

export default ModalStack;
