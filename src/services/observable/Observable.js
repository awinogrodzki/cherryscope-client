import { Observable as RxObservable } from 'rxjs/Observable';
import 'rxjs/add/operator/publish';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/debounce';
import 'rxjs/add/operator/distinctUntilChanged';

class Observable {
  constructor(callback) {
    this.source = null;
    this.observer = null;
    this.callback = callback;

    if (typeof callback !== 'function') {
      throw new Error('Callback argument should be a function');
    }

    this.createSource();
  }

  createSource() {
    this.source = RxObservable
      .create(observer => this.setObserver(observer));
  }

  setObserver(observer) {
    this.observer = observer;
  }

  createHandler(observer) {
    return (eventData) => {
      observer.next(eventData);
    };
  }

  getHandler() {
    return this.createHandler(this.observer);
  }

  register() {
    const published = this.source.publish();
    published.subscribe((value) => { this.handleEvent(value); });
    published.connect();

    return this;
  }

  debounce(time) {
    this.source = this.source.debounce(() => RxObservable.interval(time));
    return this;
  }

  distinctUntilChanged(...options) {
    this.source = this.source.distinctUntilChanged(...options);
    return this;
  }

  handleEvent(value) {
    this.callback(value);
  }
}

export default Observable;
