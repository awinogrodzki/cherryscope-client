import Modal from './Modal';

describe('Modal', () => {
  it('should not initiate without an id in type of string', () => {
    expect(() => new Modal()).toThrow();
  });
});
