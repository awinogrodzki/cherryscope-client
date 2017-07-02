class Modal {
  constructor(id, component = null) {
    if (typeof id !== 'string') {
      throw new Error('First argument of modal should be id of type string');
    }

    this.id = id;
    this.component = component;
  }

  getComponent() {
    return this.component;
  }

  getId() {
    return this.id;
  }
}

export default Modal;
