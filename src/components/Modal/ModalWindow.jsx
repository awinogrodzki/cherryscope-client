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
        ref={this.props.getContainer}
        className={styles.container}
      >
        <div
          ref={this.props.getWrapper}
          className={styles.wrapper}
        >
          <div
            ref={this.props.getContentWrapper}
          >
            <button className={styles.closeButton} onClick={() => this.props.onClose()} />
            { this.props.children }
          </div>
        </div>
      </div>
    );
  }
}

ModalWindow.propTypes = {
  getContentWrapper: PropTypes.func,
  getWrapper: PropTypes.func,
  getContainer: PropTypes.func,
  onClose: PropTypes.func,
  children: PropTypes.node,
};

ModalWindow.defaultProps = {
  getContentWrapper: () => {},
  getWrapper: () => {},
  getContainer: () => {},
  onClose: () => {},
  children: null,
};

export default onClickOutside(ModalWindow);
