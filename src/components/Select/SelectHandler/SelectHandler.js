import { find, isEqual } from 'lodash';
import EventEmitter from 'events';

export const SELECT = 'select';
export const DESELECT = 'deselect';

class SelectHandler {
  constructor() {
    this.selectedOptions = [];
    this.eventEmitter = new EventEmitter();
  }

  addListener(eventName, listener) {
    this.eventEmitter.on(eventName, listener);
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

    this.eventEmitter.emit(SELECT, this.selectedOptions);
    this.selectedOptions.push(option);
  }

  deselectOption(option) {
    this.selectedOptions = this.selectedOptions
      .filter(selectedOption => !isEqual(option, selectedOption));
    this.eventEmitter.emit(DESELECT, this.selectedOptions);
  }
}

export default SelectHandler;
