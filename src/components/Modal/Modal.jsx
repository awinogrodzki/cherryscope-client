import React from 'react';
import PropTypes from 'prop-types';
import TweenMax from 'gsap/TweenMax';
import Power2 from 'gsap/EasePack';
import ModalWindow from './ModalWindow';
import styles from './Modal.css';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.modalWindow = null;
    this.modalWrapper = null;
    this.modalContentWrapper = null;
  }

  componentWillEnter(callback) {
    this.animateModalWindowEnter(callback);
    this.animateModalWrapperEnter();
  }

  animateModalWindowEnter(callback) {
    const { x, y } = this.getInitialCoords();

    TweenMax.fromTo(
      this.modalWindow,
      1,
      { x, y, opacity: 0, scale: 1 },
      { x: 0, y: 0, opacity: 1, scale: 1, ease: Power2.easeOut, onComplete: callback }
    );
  }

  animateModalWrapperEnter() {
    TweenMax.set(
      this.modalWindow,
      { ...this.getFinalSize() }
    );

    TweenMax.set(
      this.modalContentWrapper,
      { opacity: 0 }
    );

    TweenMax.fromTo(
      this.modalWrapper,
      1,
      { ...this.getInitialSize() },
      { ...this.getFinalSize(),
        clearProps: 'all',
        onComplete: () => {
          this.animateModalContentWrapperEnter();
          this.resetModalWindow();
        },
      }
    );
  }

  animateModalWrapperLeave() {
    TweenMax.set(
      this.modalWindow,
      { ...this.getFinalSize() }
    );

    TweenMax.fromTo(
      this.modalWrapper,
      1,
      { ...this.getFinalSize() },
      { ...this.getInitialSize(),
        clearProps: 'all',
        onComplete: () => {
          this.resetModalWindow();
        },
      }
    );
  }

  animateModalContentWrapperEnter() {
    TweenMax.to(
      this.modalContentWrapper,
      0.3,
      { opacity: 1 }
    );
  }

  animateModalContentWrapperLeave(callback) {
    TweenMax.to(
      this.modalContentWrapper,
      0.3,
      { opacity: 0, onComplete: callback }
    );
  }

  resetModalWindow() {
    TweenMax.set(
      this.modalWindow,
      { width: '', height: '' }
    );
  }

  componentWillLeave(callback) {
    TweenMax.killAll();

    this.animateModalContentWrapperLeave(() => {
      this.animateModalWrapperLeave();
      this.animateModalWindowLeave(callback);
    });
  }

  animateModalWindowLeave(callback) {
    const { x, y } = this.getInitialCoords();

    TweenMax.fromTo(
      this.modalWindow,
      1,
      { x: 0, y: 0, opacity: 1, scale: 1 },
      { x, y, opacity: 0, scale: 1, ease: Power2.easeOut, onComplete: callback }
    );
  }

  getInitialCoords() {
    if (!this.props.animateFromElement) {
      return { x: 0, y: 100 };
    }

    const elementCoords = this.getElementCoords(this.props.animateFromElement);
    const modalWindowCoords = this.getElementCoords(this.modalWindow);


    return {
      x: elementCoords.x - modalWindowCoords.x,
      y: elementCoords.y - modalWindowCoords.y,
    };
  }

  getElementCoords(element) {
    const clientRect = element.getBoundingClientRect();

    return {
      x: clientRect.left,
      y: clientRect.top,
    };
  }

  getInitialSize() {
    if (!this.props.animateFromElement) {
      return {};
    }

    const { width, height } = this.props.animateFromElement.getBoundingClientRect();

    return {
      width,
      height,
    };
  }

  getFinalSize() {
    if (!this.props.animateFromElement) {
      return {};
    }

    const { width, height } = this.modalWindow.getBoundingClientRect();

    return {
      width,
      height,
    };
  }


  render() {
    return (
      <div
        className={styles.container}
      >
        <ModalWindow
          getContentWrapper={element => this.modalContentWrapper = element}
          getWrapper={element => this.modalWrapper = element}
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
  animateFromElement: PropTypes.instanceOf(Element),
  onClose: PropTypes.func,
  children: PropTypes.node,
};

Modal.defaultProps = {
  animateFromElement: null,
  onClose: () => {},
  children: null,
};

export default Modal;
