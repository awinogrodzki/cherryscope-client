import uuid from 'uuid/v4';
import Modal from './Modal';

class ModalService {
  constructor() {
    this.listener = null;
    this.modals = [];
  }

  setChangeListener(listener) {
    this.listener = listener;
  }

  onChange() {
    if (typeof this.listener === 'function') {
      this.listener(this.getModals());
    }
  }

  createModal(getComponent) {
    let component = null;

    if (typeof getComponent === 'function') {
      component = getComponent();
    }

    const modal = new Modal(uuid(), component);

    this.modals.push(modal);
    this.onChange();

    return modal;
  }

  removeModal(modalToRemove) {
    this.modals = this.modals.filter(modal => modal.getId() !== modalToRemove.getId());

    this.onChange();
  }

  getModals() {
    return this.modals;
  }
}

export default ModalService;
