import React from 'react';
import PropTypes from 'prop-types';
import TweenMax from 'gsap/TweenMax';
import Power2 from 'gsap/EasePack';
import ModalWindow from './ModalWindow';
import styles from './Modal.css';

const WINDOW_ANIMATION_TIME = 0.5;
const CONTENT_ANIMATION_TIME = 0.3;

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.container = null;
    this.modalWindow = null;
    this.modalWrapper = null;
    this.modalContentWrapper = null;
  }

  componentWillEnter(callback) {
    this.container.classList.add(styles.isAnimated);

    if (!this.props.animateFromElement) {
      const initialCoords = { x: 0, y: 100 };

      this.animateModalWindowEnter(initialCoords, callback);
      return;
    }

    this.setModalContentWrapperOpacity(0);
    this.animateModalWrapperSize(
      this.getInitialSize(),
      this.getFinalSize(),
      () => this.animateModalContentWrapperOpacity(1)
    );
    this.animateModalWindowEnter(this.getInitialCoords(), callback);
  }

  componentDidEnter() {
    this.container.classList.add(styles.didEnter);
  }

  componentWillLeave(callback) {
    this.container.classList.add(styles.willLeave);

    if (!this.props.animateFromElement) {
      const finalCoords = { x: 0, y: -100 };

      this.animateModalWindowLeave(finalCoords, callback);
      return;
    }

    this.animateModalContentWrapperOpacity(0, () => {
      this.animateModalWrapperSize(this.getFinalSize(), this.getInitialSize());
      this.animateModalWindowLeave(this.getInitialCoords(), callback);
    });
  }

  animateModalWindowEnter({ x, y }, callback) {
    TweenMax.fromTo(
      this.modalWindow,
      WINDOW_ANIMATION_TIME,
      { x, y, opacity: 0 },
      { x: 0, y: 0, opacity: 1, ease: Power2.easeOut, onComplete: callback }
    );
  }

  animateModalWrapperSize(initialSize, finalSize, callback) {
    TweenMax.set(
      this.modalWindow,
      { ...this.getFinalSize() }
    );

    TweenMax.fromTo(
      this.modalWrapper,
      WINDOW_ANIMATION_TIME,
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

  animateModalContentWrapperOpacity(opacity, callback) {
    TweenMax.to(
      this.modalContentWrapper,
      CONTENT_ANIMATION_TIME,
      { opacity, onComplete: callback }
    );
  }

  setModalContentWrapperOpacity(opacity) {
    TweenMax.set(
      this.modalContentWrapper,
      { opacity }
    );
  }

  resetModalWindow() {
    TweenMax.set(
      this.modalWindow,
      { width: '', height: '' }
    );
  }

  animateModalWindowLeave({ x, y }, callback) {
    TweenMax.fromTo(
      this.modalWindow,
      WINDOW_ANIMATION_TIME,
      { x: 0, y: 0, opacity: 1 },
      { x, y, opacity: 0, ease: Power2.easeOut, onComplete: callback }
    );
  }

  getInitialCoords() {
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
    const { width, height } = this.props.animateFromElement.getBoundingClientRect();

    return {
      width,
      height,
    };
  }

  getFinalSize() {
    const { width, height } = this.modalWindow.getBoundingClientRect();

    return {
      width,
      height,
    };
  }


  render() {
    return (
      <div
        ref={element => this.container = element}
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
