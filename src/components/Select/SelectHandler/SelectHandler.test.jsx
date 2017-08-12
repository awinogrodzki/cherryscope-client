import SelectHandler from './SelectHandler';

let selectHandler = null;
const mockEventEmitter = {
  on: jest.fn(),
  emit: jest.fn(),
};

describe('SelectHandler', () => {
  beforeEach(() => {
    selectHandler = new SelectHandler(mockEventEmitter);
    mockEventEmitter.on.mockClear();
    mockEventEmitter.emit.mockClear();
  });

  it('should be able to add new event listener', () => {
    const listener = () => {};
    selectHandler.addChangeListener(listener);

    expect(mockEventEmitter.on).toHaveBeenCalledWith('change', listener);
  });

  it('should be able to select options', () => {
    const option = {
      label: 'Test',
      value: 123,
    };

    selectHandler.selectOption(option);
    expect(selectHandler.getSelectedOptions()).toContain(option);
  });

  it('should not select same option more than once', () => {
    const option = {
      label: 'Test',
      value: 123,
    };

    selectHandler.selectOption(option);
    selectHandler.selectOption(option);
    selectHandler.selectOption(option);

    expect(selectHandler.getSelectedOptions()).toHaveLength(1);
  });

  it('should emit event on option select with list of selected options', () => {
    const option = {
      label: 'Test',
      value: 123,
    };

    selectHandler.selectOption(option);

    expect(mockEventEmitter.emit).toHaveBeenCalledWith('change', [option]);
  });

  it('should be able to unselect selected option', () => {
    const option = {
      label: 'Test',
      value: 123,
    };

    selectHandler.selectOption(option);
    expect(selectHandler.getSelectedOptions()).toHaveLength(1);
    selectHandler.unselectOption(option);
    expect(selectHandler.getSelectedOptions()).toHaveLength(0);
  });

  it('should not be able to unselect not selected option', () => {
    const option = {
      label: 'Test',
      value: 123,
    };
    const notSelectedOption = {
      label: 'Test2',
      value: 1234,
    };

    selectHandler.selectOption(option);
    expect(selectHandler.getSelectedOptions()).toHaveLength(1);
    selectHandler.unselectOption(notSelectedOption);
    expect(selectHandler.getSelectedOptions()).toHaveLength(1);
  });
});
