import React from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import styles from './ModalWindow.css';

class ModalWindow extends React.Component {
  handleClickOutside() {
    this.props.onClose();
  }

  render() {
    return (
      <div
        className={styles.container}
      >
        <button className={styles.closeButton} onClick={() => this.props.onClose()}>×</button>
        { this.props.children }
      </div>
    );
  }
}

ModalWindow.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.node,
};

ModalWindow.defaultProps = {
  onClose: () => {},
  children: null,
};

export default onClickOutside(ModalWindow);
