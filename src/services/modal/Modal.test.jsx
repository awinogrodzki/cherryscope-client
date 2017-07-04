import React from 'react';
import Modal from './Modal';

const testComponent = () => <div>TestComponent</div>;

describe('Modal', () => {
  it('should not initiate without an id in type of string', () => {
    expect(() => new Modal()).toThrow();
  });

  it('should return given component', () => {
    const modal = new Modal('123', <testComponent />);

    expect(modal.getComponent()).toEqual(<testComponent />);
  });

  it('should return given options', () => {
    const modal = new Modal('123', null, { test: 'Test' });

    expect(modal.getOptions()).toEqual({ test: 'Test' });
  });
});
