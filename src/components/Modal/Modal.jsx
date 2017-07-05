import React from 'react';
import PropTypes from 'prop-types';
import TweenMax from 'gsap/TweenMax';
import Power2 from 'gsap/EasePack';
import ModalWindow from './ModalWindow';
import styles from './Modal.css';

const ANIMATION_TIME = 0.5;

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.modalWindow = null;
    this.modalWrapper = null;
    this.modalContentWrapper = null;
  }

  componentWillEnter(callback) {
    TweenMax.set(
      this.modalContentWrapper,
      { opacity: 0 }
    );

    this.animateModalWrapper(
      this.getInitialSize(),
      this.getFinalSize(),
      () => this.animateModalContentWrapperEnter()
    );
    this.animateModalWindowEnter(callback);
  }

  componentWillLeave(callback) {
    this.animateModalContentWrapperLeave(() => {
      this.animateModalWrapper(this.getFinalSize(), this.getInitialSize());
      this.animateModalWindowLeave(callback);
    });
  }

  animateModalWindowEnter(callback) {
    const { x, y } = this.getInitialCoords();

    TweenMax.fromTo(
      this.modalWindow,
      ANIMATION_TIME,
      { x, y, opacity: 0 },
      { x: 0, y: 0, opacity: 1, ease: Power2.easeOut, onComplete: callback }
    );
  }

  animateModalWrapper(initialSize, finalSize, callback) {
    if (!this.props.animateFromElement) {
      return;
    }

    TweenMax.set(
      this.modalWindow,
      { ...this.getFinalSize() }
    );

    TweenMax.fromTo(
      this.modalWrapper,
      ANIMATION_TIME,
      { ...initialSize },
      { ...finalSize,
        clearProps: 'all',
        onComplete: () => {
          if (typeof callback === 'function') {
            callback();
          }

          this.resetModalWindow();
        },
      }
    );
  }

  animateModalContentWrapperEnter() {
    TweenMax.to(
      this.modalContentWrapper,
      ANIMATION_TIME,
      { opacity: 1 }
    );
  }

  animateModalContentWrapperLeave(callback) {
    if (!this.props.animateFromElement) {
      callback();
      return;
    }

    TweenMax.to(
      this.modalContentWrapper,
      ANIMATION_TIME,
      { opacity: 0, onComplete: callback }
    );
  }

  resetModalWindow() {
    TweenMax.set(
      this.modalWindow,
      { width: '', height: '' }
    );
  }

  animateModalWindowLeave(callback) {
    const { x, y } = this.getInitialCoords();

    TweenMax.fromTo(
      this.modalWindow,
      ANIMATION_TIME,
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
