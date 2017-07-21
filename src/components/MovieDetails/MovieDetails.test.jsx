import React from 'react';
import { shallow } from 'enzyme';
import MovieDetails from './MovieDetails';


describe('MovieDetails', () => {
  it('should not render empty links', () => {
    const wrapper = shallow(
      <MovieDetails
        genres={[]}
        directors={[]}
        writers={[]}
        cast={[]}
      />
    );

    expect(wrapper.find('[data-test="MovieDetails.links"]')).toHaveLength(0);
  });

  it('should render genres links', () => {
    const genres = [
      { id: 123, name: 'First genre' },
      { id: 321, name: 'Second genre' },
    ];
    const wrapper = shallow(<MovieDetails genres={genres} />);
    const linksWrapper = wrapper.find('[data-test="MovieDetails.links"]');
    const linkWrapper = linksWrapper.find('[data-test="MovieDetails.link"]');

    expect(linksWrapper).toHaveLength(1);
    expect(linkWrapper).toHaveLength(2);
    expect(linkWrapper.at(0).text()).toBe('First genre');
    expect(linkWrapper.at(1).text()).toBe('Second genre');
  });

  it('should display image only if provided', () => {
    const wrapperWithoutImage = shallow(<MovieDetails />);
    const wrapperWithImage = shallow(<MovieDetails image="imageUrl" />);

    expect(wrapperWithoutImage.find('[data-test="MovieDetails.image"]')).toHaveLength(0);
    expect(wrapperWithImage.find('[data-test="MovieDetails.image"]')).toHaveLength(1);
  });

  it('should display title only when it is different from original title', () => {
    const wrapperWithSameTitles = shallow(
      <MovieDetails originalTitle="title" title="title" />
    );
    const wrapperWithDifferentTitles = shallow(
      <MovieDetails originalTitle="title" title="tytuł" />
    );

    expect(wrapperWithSameTitles.find('[data-test="MovieDetails.title"]')).toHaveLength(0);
    expect(wrapperWithDifferentTitles.find('[data-test="MovieDetails.title"]')).toHaveLength(1);
  });

  it('should display imdbUrl only if provided', () => {
    const wrapperWithUrl = shallow(<MovieDetails imdbUrl="imdbUrl" />);
    const wrapperWithoutUrl = shallow(<MovieDetails />);

    expect(wrapperWithUrl.find('[data-test="MovieDetails.imdbUrl"]')).toHaveLength(1);
    expect(wrapperWithoutUrl.find('[data-test="MovieDetails.imdbUrl"]')).toHaveLength(0);
  });
});
