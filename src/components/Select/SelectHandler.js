import { find, isEqual } from 'lodash';
import EventEmitter from 'events';

const CHANGE = 'change';

class SelectHandler {
  constructor() {
    this.selectedOptions = [];
    this.eventEmitter = new EventEmitter();
  }

  addChangeListener(listener) {
    this.eventEmitter.on(CHANGE, listener);
  }

  getSelectedOptions() {
    return this.selectedOptions;
  }

  isOptionSelected(option) {
    return !!find(this.selectedOptions, option);
  }

  selectOption(option) {
    if (this.isOptionSelected(option)) {
      return;
    }

    this.eventEmitter.emit(CHANGE, this.selectedOptions);
    this.selectedOptions.push(option);
  }

  unselectOption(option) {
    this.selectedOptions = this.selectedOptions
      .filter(selectedOption => !isEqual(option, selectedOption));
    this.eventEmitter.emit(CHANGE, this.selectedOptions);
  }
}

export default SelectHandler;
