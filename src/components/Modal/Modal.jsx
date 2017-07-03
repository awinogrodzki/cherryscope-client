import React from 'react';
import PropTypes from 'prop-types';
import TweenMax from 'gsap/TweenMax';
import ModalWindow from './ModalWindow';
import styles from './Modal.css';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.modalWindow = null;
  }

  componentWillEnter(callback) {
    TweenMax.fromTo(
      this.modalWindow,
      0.3,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, onComplete: callback }
    );
  }

  componentWillLeave(callback) {
    TweenMax.fromTo(
      this.modalWindow,
      0.3,
      { y: 0, opacity: 1 },
      { y: -100, opacity: 0, onComplete: callback }
    );
  }

  render() {
    return (
      <div
        className={styles.container}
      >
        <ModalWindow
          getContainer={element => this.modalWindow = element}
          onClose={this.props.onClose}
        >
          { this.props.children }
        </ModalWindow>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.node,
};

Modal.defaultProps = {
  onClose: () => {},
  children: null,
};

export default Modal;
