import SelectHandler, { SELECT, DESELECT } from './SelectHandler';

let selectHandler = null;

describe('SelectHandler', () => {
  beforeEach(() => {
    selectHandler = new SelectHandler();
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
    const spy = jest.fn();
    selectHandler.addListener(SELECT, spy);
    selectHandler.selectOption(option);

    expect(spy).toHaveBeenCalledWith([option]);
  });

  it('should emit event on option deselect with list of selected options', () => {
    const option = {
      label: 'Test',
      value: 123,
    };
    const spy = jest.fn();
    selectHandler.addListener(DESELECT, spy);
    selectHandler.selectOption(option);
    selectHandler.deselectOption(option);

    expect(spy).toHaveBeenCalledWith([]);
  });

  it('should be able to deselect selected option', () => {
    const option = {
      label: 'Test',
      value: 123,
    };

    selectHandler.selectOption(option);
    expect(selectHandler.getSelectedOptions()).toHaveLength(1);
    selectHandler.deselectOption(option);
    expect(selectHandler.getSelectedOptions()).toHaveLength(0);
  });

  it('should not be able to deselect not selected option', () => {
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
    selectHandler.deselectOption(notSelectedOption);
    expect(selectHandler.getSelectedOptions()).toHaveLength(1);
  });
});
