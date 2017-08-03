import React from 'react';
import { shallow } from 'enzyme';
import LoadMore from './LoadMore';

describe('LoadMore', () => {
  it('should increment given page number on click', () => {
    const onChangeSpy = jest.fn();
    const wrapper = shallow(<LoadMore page={3} onChange={onChangeSpy} />);

    wrapper.find('button').simulate('click');
    expect(onChangeSpy).toHaveBeenCalledWith(4);
  });
});
