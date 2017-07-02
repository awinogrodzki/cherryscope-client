import React from 'react';
import PropTypes from 'prop-types';
import ModalWindow from './ModalWindow';
import styles from './Modal.css';

const Modal = ({ onClose, children }) => (
  <div
    className={styles.container}
  >
    <ModalWindow onClose={onClose}>
      { children }
    </ModalWindow>
  </div>
);

Modal.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.node,
};

Modal.defaultProps = {
  onClose: () => {},
  children: null,
};

export default Modal;
