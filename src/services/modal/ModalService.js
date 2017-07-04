import { EventEmitter } from 'fbemitter';
import uuid from 'uuid/v4';
import Modal from './Modal';

const CHANGE_EVENT = 'change';

class ModalService {
  constructor() {
    this.eventEmitter = new EventEmitter();
    this.modals = [];
  }

  addChangeListener(callback) {
    this.eventEmitter.addListener(CHANGE_EVENT, callback);
  }

  removeAllListeners() {
    this.eventEmitter.removeAllListeners();
  }

  onChange() {
    this.eventEmitter.emit(CHANGE_EVENT, this.getModals());
  }

  createModal(getComponent, options) {
    let component = null;

    if (typeof getComponent === 'function') {
      component = getComponent();
    }

    const modal = new Modal(uuid(), component, options);

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
