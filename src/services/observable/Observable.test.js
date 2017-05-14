import Observable from './Observable';

jest.mock('rxjs/add/operator/publish', () => null);
jest.mock('rxjs/add/observable/interval', () => null);
jest.mock('rxjs/add/operator/debounce', () => null);
jest.mock('rxjs/add/operator/distinctUntilChanged', () => null);

jest.mock('rxjs/Observable', () => ({
  Observable: require('mocks/ObservableMock').default, // eslint-disable-line global-require
}));

describe('Observable', () => {
  it('should not initiate without callback function', () => {
    expect(() => new Observable()).toThrow();
  });

  it('should create observable source upon creation', () => {
    const observable = new Observable(() => {});
    expect(observable.source).not.toBeNull();
  });

  it('should call callback function when handler is called', () => new Promise((resolve) => {
    const observable = new Observable((value) => {
      expect(value).toBe('testValue');
      resolve();
    });
    observable.register();
    const handler = observable.getHandler();
    handler('testValue');
  }));

  it('should be able to debounce', () => {
    const observable = new Observable(value => value);
    expect(observable.debounce(500).source).toEqual(500);
  });

  it('should be able to debounce', () => {
    const observable = new Observable(value => value);
    expect(observable.distinctUntilChanged('test').source).toEqual('test');
  });
});
