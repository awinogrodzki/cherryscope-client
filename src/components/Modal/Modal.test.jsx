import React from 'react';
import { mount } from 'enzyme';
import TweenMaxMock from 'gsap/TweenMax';
import Modal from './Modal';

/* eslint-disable no-unused-vars */

jest.mock('gsap/TweenMax', () => ({
  set: jest.fn((element, options) => {}),
  fromTo: jest.fn((element, time, optionsFrom, optionsTo) => {
    optionsTo.onComplete && optionsTo.onComplete();
  }),
  to: jest.fn((element, time, optionsTo) => {
    optionsTo.onComplete && optionsTo.onComplete();
  }),
}));

Element.prototype.getBoundingClientRect = jest.fn(() => ({
  width: 100,
  height: 100,
  top: 150,
  left: 100,
  bottom: 0,
  right: 0,
}));

describe('Modal', () => {
  describe('animation', () => {
    const wrapper = mount(<Modal />);

    beforeAll(() => {
      TweenMaxMock.set.mockClear();
      TweenMaxMock.fromTo.mockClear();
      TweenMaxMock.to.mockClear();

      wrapper.instance().componentWillEnter();
    });

    it('should animate on enter', () => {
      const [element, time, fromOptions, toOptions] = TweenMaxMock.fromTo.mock.calls[0];

      expect(element).toBe(wrapper.instance().modalWindow);
      expect(wrapper.instance().container.classList).toContain('isAnimated');
      expect(document.body.classList).toContain('hasModal');
      expect(fromOptions).toEqual({ x: 0, y: 100, opacity: 0 });
      expect(toOptions).toEqual({ x: 0, y: 0, opacity: 1 });
    });

    it('should set class if component did enter', () => {
      wrapper.instance().componentDidEnter();

      expect(wrapper.instance().container.classList).toContain('didEnter');
    });

    it('should animate on leave', () => {
      TweenMaxMock.fromTo.mockClear();
      wrapper.instance().componentWillLeave();
      const [element, time, fromOptions, toOptions] = TweenMaxMock.fromTo.mock.calls[0];

      expect(element).toBe(wrapper.instance().modalWindow);
      expect(wrapper.instance().container.classList).toContain('willLeave');
      expect(document.body.classList).not.toContain('hasModal');
      expect(fromOptions).toEqual({ x: 0, y: 0, opacity: 1 });
      expect(toOptions).toEqual({ x: 0, y: -100, opacity: 0 });
    });
  });

  describe('animateFromElement', () => {
    const animateFromElement = document.createElement('div');
    animateFromElement.getBoundingClientRect = jest.fn(() => ({
      width: 50,
      height: 50,
      top: 25,
      left: 100,
      bottom: 0,
      right: 0,
    }));
    const wrapper = mount(<Modal animateFromElement={animateFromElement} />);

    beforeAll(() => {
      TweenMaxMock.set.mockClear();
      TweenMaxMock.fromTo.mockClear();
      TweenMaxMock.to.mockClear();

      wrapper.instance().componentWillEnter();
    });

    it('should hide element on animation start', () => {
      const [element, options] = TweenMaxMock.set.mock.calls[0];

      expect(element).toBe(wrapper.instance().modalContentWrapper);
      expect(options).toEqual({ opacity: 0 });
    });

    it('should set modal window size to it\'s final size', () => {
      const [element, options] = TweenMaxMock.set.mock.calls[1];

      expect(element).toBe(wrapper.instance().modalWindow);
      expect(options).toEqual({ width: 100, height: 100 });
    });

    it('should animate modal wrapper size from provided element to modal wrapper', () => {
      const [element, time, fromOptions, toOptions] = TweenMaxMock.fromTo.mock.calls[0];

      expect(element).toBe(wrapper.instance().modalWrapper);
      expect(fromOptions).toEqual({ width: 50, height: 50 });
      expect(toOptions).toMatchObject({ width: 100, height: 100, clearProps: 'all' });
    });

    it('should animate modal wrapper position from provided element to modal wrapper', () => {
      const [element, time, fromOptions, toOptions] = TweenMaxMock.fromTo.mock.calls[1];

      expect(element).toBe(wrapper.instance().modalWindow);
      expect(fromOptions).toEqual({ opacity: 0, x: 0, y: -125 });
      expect(toOptions).toEqual({ opacity: 1, x: 0, y: 0 });
    });

    it('should remove fixed size after animation', () => {
      const [element, options] = TweenMaxMock.set.mock.calls[2];

      expect(element).toBe(wrapper.instance().modalWindow);
      expect(options).toEqual({ width: '', height: '' });
    });

    it('should animate modal wrapper size and position from modal wrapper to provided element', () => {
      TweenMaxMock.fromTo.mockClear();
      wrapper.instance().componentWillLeave();
      const [wrapperElement, sizeTime, fromSize, toSize] = TweenMaxMock.fromTo.mock.calls[0];
      const [windowElement, time, fromOptions, toOptions] = TweenMaxMock.fromTo.mock.calls[1];

      expect(wrapperElement).toBe(wrapper.instance().modalWrapper);
      expect(fromSize).toEqual({ width: 100, height: 100 });
      expect(toSize).toMatchObject({ width: 50, height: 50, clearProps: 'all' });

      expect(windowElement).toBe(wrapper.instance().modalWindow);
      expect(fromOptions).toEqual({ opacity: 1, x: 0, y: 0 });
      expect(toOptions).toEqual({ opacity: 0, x: 0, y: -125 });
    });

    it('should hide element on animation end', () => {
      TweenMaxMock.to.mockClear();
      wrapper.instance().componentWillLeave();
      const [element, time, options] = TweenMaxMock.to.mock.calls[0];

      expect(element).toBe(wrapper.instance().modalContentWrapper);
      expect(options).toMatchObject({ opacity: 0 });
    });
  });
});
