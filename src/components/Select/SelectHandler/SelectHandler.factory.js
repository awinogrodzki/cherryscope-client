import EventEmitter from 'events';
import SelectHandler from './SelectHandler';

 /* istanbul ignore next */
const SelectHandlerFactory = () => {
  const eventEmitter = new EventEmitter();

  return new SelectHandler(eventEmitter);
};


export default SelectHandlerFactory;
