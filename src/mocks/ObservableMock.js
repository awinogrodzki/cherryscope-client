const ObservableMock = {
  callback: null,

  create(callback) {
    callback({
      next: value => this.callback(value),
    });
    return {
      publish: () => ({
        subscribe: (sourceCallback) => {
          this.callback = sourceCallback;
        },
        connect: () => {},
      }),
      debounce: debounceCallback => debounceCallback(),
      distinctUntilChanged: value => value,
    };
  },

  interval: value => value,
};

export default ObservableMock;
