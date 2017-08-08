import React from 'react';
import { shallow, mount } from 'enzyme';
import Loader from 'components/Loader';
import Value from './Value';
import Option from './Option';
import OptionGroup from './OptionGroup';
import Select from './Select';

const mockOptions = [
  { value: 1, label: 'Value', type: 'genre' },
  { value: 2, label: 'Value2', type: 'genre' },
  { value: 3, label: 'Value3', type: 'test' },
];

describe('Select', () => {
  it('should display option list', () => {
    const wrapper = mount(<Select isExpanded options={mockOptions} />);
    const optionGroupWrapper = wrapper.find(OptionGroup);

    expect(optionGroupWrapper).toHaveLength(1);
    expect(optionGroupWrapper.find(Option)).toHaveLength(3);
  });

  it('should filter options based on input value', () => {
    const options = [
      { value: 1, label: 'Value' },
      { value: 2, label: 'Value 2' },
      { value: 3, label: 'Val 3' },
      { value: 4, label: 'Test' },
      { value: 5, label: 'Test2' },
      { value: 6, label: 'Test3' },
    ];
    const wrapper = mount(<Select isExpanded inputValue={'val'} options={options} />);
    const optionGroupWrapper = wrapper.find(OptionGroup);

    expect(optionGroupWrapper).toHaveLength(1);
    expect(optionGroupWrapper.find(Option)).toHaveLength(3);
  });

  it('should be able to not filter grouped options', () => {
    const optionGroups = [
      {
        label: 'Test',
        filterByInput: false,
        options: [
          { value: 1, label: 'Value' },
          { value: 2, label: 'Abc' },
          { value: 3, label: 'Xyz' },
        ],
      },
    ];
    const wrapper = mount(<Select isExpanded inputValue={'val'} optionGroups={optionGroups} />);
    const optionGroupWrapper = wrapper.find(OptionGroup);

    expect(optionGroupWrapper.find(Option)).toHaveLength(3);
  });

  it('should be able to not select only one item from group', () => {
    const optionGroups = [
      {
        label: 'Test',
        isSingle: true,
        options: [
          { value: 1, label: 'Value' },
          { value: 2, label: 'Abc' },
          { value: 3, label: 'Xyz' },
        ],
      },
    ];
    const wrapper = mount(<Select isExpanded optionGroups={optionGroups} />);

    wrapper.find(Option).at(0).simulate('mousedown');

    expect(wrapper.find(Option)).toHaveLength(0);
    expect(wrapper.find(Value)).toHaveLength(1);
    expect(wrapper.find(Value).props().option.label).toBe('Value');
  });

  it('should be able to select only unique values from group', () => {
    const optionGroups = [
      {
        label: 'Test',
        isUnique: true,
        options: [
          { value: 1, label: 'Value' },
          { value: 1, label: 'Abc' },
          { value: 3, label: 'Xyz' },
        ],
      },
    ];
    const wrapper = mount(<Select isExpanded optionGroups={optionGroups} />);

    wrapper.find(Option).at(0).simulate('mousedown');

    expect(wrapper.find(Option)).toHaveLength(1);
    expect(wrapper.find(Value)).toHaveLength(1);
    expect(wrapper.find(Value).props().option.label).toBe('Value');
    expect(wrapper.find(Option).props().option.label).toBe('Xyz');
  });

  it('should pass input value on change', () => {
    const onInputChange = jest.fn();
    const wrapper = mount(<Select onInputChange={onInputChange} />);
    const inputWrapper = wrapper.find('[data-test="Select.input"]');

    inputWrapper.simulate('change', {
      target: {
        value: 'testString',
      },
    });
    expect(onInputChange).toBeCalledWith('testString');
  });

  it('should be able to render option groups', () => {
    const optionGroups = [
      {
        label: 'Test',
        options: [
          { value: 1, label: 'Value' },
        ],
      },
      {
        label: 'Test2',
        options: [
          { value: 2, label: 'Value2' },
        ],
      },
    ];
    const wrapper = shallow(<Select isExpanded optionGroups={optionGroups} />);

    expect(wrapper.find(OptionGroup)).toHaveLength(2);
  });

  it('should not display empty option groups', () => {
    const optionGroups = [
      {
        label: 'Test',
        options: [
          { value: 1, label: 'Value' },
        ],
      },
      {
        label: 'Test2',
        options: [],
      },
    ];
    const wrapper = shallow(<Select isExpanded optionGroups={optionGroups} />);

    expect(wrapper.find(OptionGroup)).toHaveLength(1);
  });

  it('should be able to extract selected values on option click', () => {
    const onChangeHandler = jest.fn();
    const wrapper = mount(<Select isExpanded options={mockOptions} onChange={onChangeHandler} />);

    wrapper.find(Option).at(0).simulate('mousedown');
    expect(onChangeHandler).toBeCalledWith([mockOptions[0]]);

    wrapper.find(Option).at(0).simulate('mousedown');
    expect(onChangeHandler).toBeCalledWith([mockOptions[0], mockOptions[1]]);

    wrapper.find(Option).at(0).simulate('mousedown');
    expect(onChangeHandler).toBeCalledWith([mockOptions[0], mockOptions[1], mockOptions[2]]);
  });

  it('should not add values that are already added', () => {
    const onChangeHandler = jest.fn();
    const wrapper = mount(<Select isExpanded options={mockOptions} onChange={onChangeHandler} />);

    wrapper.find(Option).at(0).simulate('mousedown');
    wrapper.find(Option).at(0).simulate('mousedown');
    wrapper.find(Option).at(0).simulate('mousedown');

    expect(onChangeHandler).toBeCalledWith([mockOptions[0]]);
  });

  it('should be able to select options', () => {
    const wrapper = mount(<Select isExpanded options={mockOptions} />);
    const optionWrapper = wrapper.find(Option);

    optionWrapper.at(0).simulate('mousedown');
    optionWrapper.at(0).simulate('mousedown');
    optionWrapper.at(0).simulate('mousedown');

    expect(wrapper.find(Value)).toHaveLength(3);
  });

  it('should be able to delete selected values', () => {
    const wrapper = mount(<Select values={mockOptions} options={mockOptions} />);

    wrapper.find(Value).at(0).find('[data-test="Value.deleteButton"]').simulate('mousedown');
    wrapper.find(Value).at(0).find('[data-test="Value.deleteButton"]').simulate('mousedown');
    wrapper.find(Value).at(0).find('[data-test="Value.deleteButton"]').simulate('mousedown');

    expect(wrapper.find(Value)).toHaveLength(0);
  });

  it('should be able to delete selected values on input backspace if input is empty', () => {
    const wrapper = mount(<Select inputValue={''} values={mockOptions} options={mockOptions} />);
    const valueWrapper = wrapper.find(Value);
    const inputWrapper = wrapper.find('[data-test="Select.input"]');
    const event = {
      keyCode: Select.BACKSPACE_KEY,
    };

    expect(valueWrapper).toHaveLength(3);

    inputWrapper.simulate('keydown', event);
    inputWrapper.simulate('keydown', event);
    inputWrapper.simulate('keydown', event);

    expect(wrapper.find(Value)).toHaveLength(0);
  });

  it('should be able to select values on enter key', () => {
    const wrapper = mount(<Select options={mockOptions} />);
    const inputWrapper = wrapper.find('[data-test="Select.input"]');
    const event = {
      keyCode: Select.ENTER_KEY,
    };

    inputWrapper.simulate('keydown', event);
    inputWrapper.simulate('keydown', event);
    inputWrapper.simulate('keydown', event);

    expect(wrapper.find(Value)).toHaveLength(3);
  });

  it('should be able to select values on enter key with option groups', () => {
    const optionGroups = [
      {
        label: 'Test',
        options: [
          { value: 1, label: 'Value', type: 'genre' },
          { value: 2, label: 'Value2', type: 'genre' },
        ],
      },
      {
        label: 'Test2',
        options: [
          { value: 3, label: 'Value3', type: 'test' },
        ],
      },
    ];
    const wrapper = mount(<Select optionGroups={optionGroups} />);
    const inputWrapper = wrapper.find('[data-test="Select.input"]');
    const event = {
      keyCode: Select.ENTER_KEY,
    };

    inputWrapper.simulate('keydown', event);
    inputWrapper.simulate('keydown', event);
    inputWrapper.simulate('keydown', event);

    expect(wrapper.find(Value)).toHaveLength(3);
  });

  it('should clear input on option select', () => {
    const options = [
      { value: 1, label: 'Value', type: 'genre' },
    ];
    const wrapper = mount(<Select inputValue={'Value'} isExpanded options={options} />);
    wrapper.find(Option).at(0).simulate('mousedown');

    expect(wrapper.find('[data-test="Select.input"]').props().value).toBe('');
  });

  it('should not be able to delete value with backspace if input value is not empty', () => {
    const options = [
      { value: 1, label: 'Value', type: 'genre' },
    ];
    const wrapper = mount(<Select inputValue={'t'} values={options} options={options} />);
    const inputWrapper = wrapper.find('[data-test="Select.input"]');
    const event = {
      keyCode: Select.BACKSPACE_KEY,
    };

    inputWrapper.simulate('keydown', event);

    expect(wrapper.find(Value)).toHaveLength(1);
  });

  it('should not show selected options', () => {
    const options = [
      { value: 1, label: 'Value', type: 'genre' },
      { value: 2, label: 'Value2', type: 'genre' },
    ];
    const wrapper = mount(<Select isExpanded options={options} />);
    const optionWrapper = wrapper.find(Option);
    optionWrapper.at(0).simulate('mousedown');

    expect(wrapper.find(Option)).toHaveLength(1);
    expect(wrapper.find(Option).at(0).props().option.value).toBe(2);
  });

  it('should be able to expand on input focus', () => {
    const wrapper = mount(<Select />);
    const inputWrapper = wrapper.find('[data-test="Select.input"]');

    expect(wrapper.find('[data-test="Select.optionContainer"]')).toHaveLength(0);
    inputWrapper.simulate('focus');
    expect(wrapper.find('[data-test="Select.optionContainer"]')).toHaveLength(1);
  });

  it('should be able to contract on input blur', () => {
    const wrapper = mount(<Select />);
    const inputWrapper = wrapper.find('[data-test="Select.input"]');

    inputWrapper.simulate('focus');
    expect(wrapper.find('[data-test="Select.optionContainer"]')).toHaveLength(1);
    inputWrapper.simulate('blur');
    expect(wrapper.find('[data-test="Select.optionContainer"]')).toHaveLength(0);
  });

  it('should not hide option container and refocus on option click', () => {
    const options = [
      { value: 1, label: 'Value', type: 'genre' },
      { value: 2, label: 'Value2', type: 'genre' },
    ];
    const wrapper = mount(<Select options={options} />);
    const inputWrapper = wrapper.find('[data-test="Select.input"]');

    inputWrapper.simulate('focus');
    wrapper.find(Option).at(0).simulate('mousedown');

    expect(wrapper.find('[data-test="Select.optionContainer"]')).toHaveLength(1);
  });

  it('should blur input on escape key', () => {
    const wrapper = mount(<Select />);
    const inputWrapper = wrapper.find('[data-test="Select.input"]');
    inputWrapper.simulate('focus');

    expect(wrapper.find('[data-test="Select.optionContainer"]')).toHaveLength(1);

    inputWrapper.simulate('keydown', {
      keyCode: Select.ESCAPE_KEY,
    });

    expect(wrapper.find('[data-test="Select.optionContainer"]')).toHaveLength(0);
  });

  it('should clear input on escape key', () => {
    const wrapper = mount(<Select inputValue={'Test'} />);
    const inputWrapper = wrapper.find('[data-test="Select.input"]');
    inputWrapper.simulate('keydown', {
      keyCode: Select.ESCAPE_KEY,
    });

    expect(wrapper.find('[data-test="Select.input"]').props().value).toBe('');
  });

  it('should be able to ignore input blur always', () => {
    const wrapper = mount(<Select ignoreInputBlur options={mockOptions} />);
    const inputWrapper = wrapper.find('[data-test="Select.input"]');

    inputWrapper.simulate('focus');
    inputWrapper.simulate('blur');

    expect(wrapper.find(Option)).toHaveLength(3);
  });

  it('should re-focus on option group area click', () => {
    const wrapper = mount(<Select options={mockOptions} />);
    const expandableWrapper = wrapper.find('[data-test="Select.expandable"]');
    const inputWrapper = wrapper.find('[data-test="Select.input"]');
    inputWrapper.simulate('focus');
    expandableWrapper.simulate('mousedown');
    inputWrapper.simulate('blur');

    expect(wrapper.find(Option)).toHaveLength(3);
  });

  it('should expand on input keydown when not expanded', () => {
    const wrapper = mount(<Select options={mockOptions} />);
    const inputWrapper = wrapper.find('[data-test="Select.input"]');

    expect(wrapper.find(Option)).toHaveLength(0);

    inputWrapper.simulate('keydown', {
      keyCode: 99,
    });

    expect(wrapper.find(Option)).toHaveLength(3);
  });

  it('should make first option active', () => {
    const wrapper = mount(<Select isExpanded options={mockOptions} />);

    expect(wrapper.find('.activeOption').length).toBe(1);
    expect(wrapper.find('.activeOption').text()).toBe('Value');
  });

  it('should make first option from option groups active', () => {
    const optionGroups = [
      {
        label: 'Test',
        options: [
          { value: 1, label: 'Value' },
        ],
      },
      {
        label: 'Test2',
        options: [
          { value: 2, label: 'Value2' },
        ],
      },
    ];
    const wrapper = mount(<Select isExpanded optionGroups={optionGroups} />);

    expect(wrapper.find('.activeOption').length).toBe(1);
    expect(wrapper.find('.activeOption').text()).toBe('Value');
  });

  it('should make active options incrementally on arrow down click', () => {
    const wrapper = mount(<Select isExpanded options={mockOptions} />);
    const inputWrapper = wrapper.find('[data-test="Select.input"]');

    inputWrapper.simulate('keydown', {
      keyCode: Select.ARROW_DOWN_KEY,
    });

    expect(wrapper.find('.activeOption').length).toBe(1);
    expect(wrapper.find('.activeOption').text()).toBe('Value2');
  });

  it('should make active options decrementally on arrow up click', () => {
    const wrapper = mount(<Select isExpanded options={mockOptions} />);
    const inputWrapper = wrapper.find('[data-test="Select.input"]');

    inputWrapper.simulate('keydown', { keyCode: Select.ARROW_DOWN_KEY });
    inputWrapper.simulate('keydown', { keyCode: Select.ARROW_DOWN_KEY });
    inputWrapper.simulate('keydown', { keyCode: Select.ARROW_UP_KEY });

    expect(wrapper.find('.activeOption').length).toBe(1);
    expect(wrapper.find('.activeOption').text()).toBe('Value2');
  });

  it('should stop increment on option limit', () => {
    const wrapper = mount(<Select isExpanded options={mockOptions} />);
    const inputWrapper = wrapper.find('[data-test="Select.input"]');

    inputWrapper.simulate('keydown', { keyCode: Select.ARROW_DOWN_KEY });
    inputWrapper.simulate('keydown', { keyCode: Select.ARROW_DOWN_KEY });
    inputWrapper.simulate('keydown', { keyCode: Select.ARROW_DOWN_KEY });
    inputWrapper.simulate('keydown', { keyCode: Select.ARROW_DOWN_KEY });

    expect(wrapper.find('.activeOption').length).toBe(1);
    expect(wrapper.find('.activeOption').text()).toBe('Value3');
  });

  it('should stop decrement on option limit', () => {
    const wrapper = mount(<Select isExpanded options={mockOptions} />);

    wrapper.find('[data-test="Select.input"]').simulate('keydown', { keyCode: Select.ARROW_UP_KEY });

    expect(wrapper.find('.activeOption').length).toBe(1);
    expect(wrapper.find('.activeOption').text()).toBe('Value');
  });

  it('should be able to select active option on enter key', () => {
    const wrapper = mount(<Select options={mockOptions} />);
    const inputWrapper = wrapper.find('[data-test="Select.input"]');

    inputWrapper.simulate('keydown', { keyCode: Select.ARROW_DOWN_KEY });
    inputWrapper.simulate('keydown', { keyCode: Select.ARROW_DOWN_KEY });
    inputWrapper.simulate('keydown', { keyCode: Select.ENTER_KEY });

    expect(wrapper.find(Value)).toHaveLength(1);
    expect(wrapper.find(Value).at(0).props().option.label).toBe('Value3');
  });

  it('should name option group label class by option group', () => {
    const optionGroups = [
      {
        id: 'test',
        label: 'Test',
        options: [
          { value: 1, label: 'Value' },
        ],
      },
    ];
    const wrapper = mount(
      <Select isExpanded getLabelClass={group => group.id} optionGroups={optionGroups} />
    );

    expect(wrapper.find('.test').length).toBe(1);
  });

  it('should name value class by option', () => {
    const wrapper = mount(
      <Select isExpanded getValueClass={option => option.type} options={mockOptions} />
    );
    wrapper.find(Option).at(2).simulate('mousedown');

    expect(wrapper.find('.test')).toHaveLength(1);
    expect(wrapper.find('.test').text()).toBe('Value3');
  });

  it('should be able to display custom component as option', () => {
    const CustomComponent = () => <div />;
    const options = [
      { value: 1, label: 'Value', type: 'genre', customComponent: <CustomComponent /> },
      { value: 2, label: 'Value2', type: 'genre' },
      { value: 3, label: 'Value3', type: 'test' },
    ];
    const wrapper = mount(
      <Select isExpanded options={options} />
    );

    expect(wrapper.find(CustomComponent)).toHaveLength(1);
  });

  it('should display loader if select is loading', () => {
    const wrapper = shallow(<Select isLoading />);

    expect(wrapper.find(Loader)).toHaveLength(1);
  });

  it('should be able to return input element', () => {
    const getInputSpy = jest.fn();
    mount(<Select getInput={getInputSpy} />);

    expect(getInputSpy.mock.calls[0][0]).toBeTruthy();
  });

  it('should not select options if component is loading', () => {
    const wrapper = mount(<Select isExpanded isLoading options={mockOptions} />);
    const optionWrapper = wrapper.find(Option);

    optionWrapper.at(0).simulate('mousedown');

    expect(wrapper.find(Value)).toHaveLength(0);
  });

  it('should always show active option by manipulating container scroll', () => {
    const wrapper = mount(<Select isExpanded options={mockOptions} />);

    const expandableContainer = wrapper.instance().expandableContainer;
    const activeOption = wrapper.instance().activeOption;

    expandableContainer.scrollTop = 80;
    expandableContainer.getBoundingClientRect = () => ({
      bottom: 120,
    });
    activeOption.getBoundingClientRect = () => ({
      bottom: 40,
    });

    wrapper.instance().updateExpandableContainerScroll();
    expect(expandableContainer.scrollTop).toBe(0);
  });

  it('should make active last available option if last selected option was after it', () => {
    const wrapper = mount(<Select isExpanded options={mockOptions} />);
    const inputWrapper = wrapper.find('[data-test="Select.input"]');
    inputWrapper.simulate('keydown', { keyCode: Select.ARROW_DOWN_KEY });
    inputWrapper.simulate('keydown', { keyCode: Select.ARROW_DOWN_KEY });
    inputWrapper.simulate('keydown', { keyCode: Select.ENTER_KEY });

    expect(wrapper.find(Option).at(1).hasClass('activeOption')).toBe(true);
  });

  it('should adjust expandable container height on window resize', () => {
    let listenerCallback = null;
    window.addEventListener = (name, callback) => listenerCallback = callback;

    const wrapper = mount(<Select isExpanded />);
    const expandableContainer = wrapper.instance().expandableContainer;

    expandableContainer.getBoundingClientRect = () => ({
      top: 200,
      left: 40, // distance from left is considered bottom margin
    });
    document.body.getBoundingClientRect = () => ({
      height: 800,
    });

    listenerCallback();
    expect(expandableContainer.style.maxHeight).toBe('560px');
  });
});
