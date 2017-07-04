class Modal {
  constructor(id, component = null, options = {}) {
    if (typeof id !== 'string') {
      throw new Error('First argument of modal should be id of type string');
    }

    this.id = id;
    this.component = component;
    this.options = options;
  }

  getComponent() {
    return this.component;
  }

  getId() {
    return this.id;
  }

  getOptions() {
    return this.options;
  }
}

export default Modal;
