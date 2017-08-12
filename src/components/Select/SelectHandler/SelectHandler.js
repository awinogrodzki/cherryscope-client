import { find, isEqual } from 'lodash';

const CHANGE = 'change';

class SelectHandler {
  constructor(eventEmitter) {
    this.selectedOptions = [];
    this.eventEmitter = eventEmitter;
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
