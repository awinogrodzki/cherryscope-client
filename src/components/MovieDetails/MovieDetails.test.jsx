import React from 'react';
import { shallow } from 'enzyme';
import MovieDetails from './MovieDetails';

const images = [
  { id: 0, url: 'image_1_url', thumbnailUrl: 'thumbnail_1_url' },
  { id: 1, url: 'image_2_url', thumbnailUrl: 'thumbnail_2_url' },
  { id: 2, url: 'image_3_url', thumbnailUrl: 'thumbnail_3_url' },
];

const videos = [
  {
    id: '57d2ffc49251415496000429',
    key: 'PC460OxDNhc',
    name: 'Announcement',
    site: 'YouTube',
    type: 'Teaser',
  },
  {
    id: '590dedfbc3a36864a700fb24',
    key: 'T7O7BtBnsG4',
    name: 'Official Trailer #1',
    site: 'YouTube',
    type: 'Trailer',
  },
];

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

  it('should display gallery and gallery nav only if images are provided and image is selected', () => {
    const wrapperWithImages = shallow(<MovieDetails images={images} />);
    const wrapperWithoutImages = shallow(<MovieDetails />);

    wrapperWithImages.setState({ selectedImageId: 2 });

    expect(wrapperWithImages.find('[data-test="MovieDetails.imageGallery"]')).toHaveLength(1);
    expect(wrapperWithImages.find('[data-test="MovieDetails.imageGalleryNav"]')).toHaveLength(1);

    expect(wrapperWithoutImages.find('[data-test="MovieDetails.imageGallery"]')).toHaveLength(0);
    expect(wrapperWithoutImages.find('[data-test="MovieDetails.imageGalleryNav"]')).toHaveLength(0);
  });

  it('should map provided images data to thumbnails', () => {
    const wrapper = shallow(<MovieDetails images={images} />);
    const galleryNavWrapper = wrapper.find('[data-test="MovieDetails.imageGalleryNav"]');
    const thumbnails = [
      { id: 0, url: 'thumbnail_1_url' },
      { id: 1, url: 'thumbnail_2_url' },
      { id: 2, url: 'thumbnail_3_url' },
    ];

    expect(galleryNavWrapper.props().images).toEqual(thumbnails);
  });

  it('should select image on gallery image click', () => {
    const wrapper = shallow(<MovieDetails images={images} />);

    wrapper.find('[data-test="MovieDetails.imageGalleryNav"]').simulate('imageClick', 2);
    expect(wrapper.find('[data-test="MovieDetails.imageGallery"]').props().selectedImageId).toEqual(2);
    wrapper.find('[data-test="MovieDetails.imageGallery"]').simulate('thumbnailClick', 3);
    expect(wrapper.find('[data-test="MovieDetails.imageGallery"]').props().selectedImageId).toEqual(3);
  });

  it('should display video gallery and video gallery nav only if videos are provided and video is selected', () => {
    const wrapperWithVideos = shallow(<MovieDetails videos={videos} />);
    const wrapperWithoutVideos = shallow(<MovieDetails />);

    wrapperWithVideos.find('[data-test="MovieDetails.videoGalleryNav"]')
      .simulate('imageClick', '57d2ffc49251415496000429');

    expect(wrapperWithVideos.find('[data-test="MovieDetails.videoGallery"]')).toHaveLength(1);
    expect(wrapperWithVideos.find('[data-test="MovieDetails.videoGalleryNav"]')).toHaveLength(1);

    expect(wrapperWithoutVideos.find('[data-test="MovieDetails.videoGallery"]')).toHaveLength(0);
    expect(wrapperWithoutVideos.find('[data-test="MovieDetails.videoGalleryNav"]')).toHaveLength(0);
  });

  it('should map provided video data to thumbnails', () => {
    const wrapper = shallow(<MovieDetails videos={videos} />);
    const galleryNavWrapper = wrapper.find('[data-test="MovieDetails.videoGalleryNav"]');
    const thumbnails = [
      { id: '57d2ffc49251415496000429', url: 'https://img.youtube.com/vi/PC460OxDNhc/mqdefault.jpg' },
      { id: '590dedfbc3a36864a700fb24', url: 'https://img.youtube.com/vi/T7O7BtBnsG4/mqdefault.jpg' },
    ];

    expect(galleryNavWrapper.props().images).toEqual(thumbnails);
  });

  it('should select video on video thumbnail click', () => {
    const wrapper = shallow(<MovieDetails videos={videos} />);

    wrapper.find('[data-test="MovieDetails.videoGalleryNav"]').simulate('imageClick', '57d2ffc49251415496000429');
    expect(wrapper.find('[data-test="MovieDetails.videoGallery"]').props().selectedVideoId).toEqual('57d2ffc49251415496000429');
    wrapper.find('[data-test="MovieDetails.videoGallery"]').simulate('thumbnailClick', 'test_id');
    expect(wrapper.find('[data-test="MovieDetails.videoGallery"]').props().selectedVideoId).toEqual('test_id');
  });

  it('should pause video on gallery close', () => {
    const wrapper = shallow(<MovieDetails videos={videos} />);
    const event = {
      target: {
        pauseVideo: jest.fn(),
      },
    };

    wrapper.find('[data-test="MovieDetails.videoGalleryNav"]').simulate('imageClick', '57d2ffc49251415496000429');
    wrapper.find('[data-test="MovieDetails.videoGallery"]').simulate('videoReady', event);
    wrapper.find('[data-test="MovieDetails.galleryCloseButton"]').simulate('click');

    expect(event.target.pauseVideo).toHaveBeenCalled();
  });

  it('should not pause video on gallery close if image gallery is opened', () => {
    const wrapper = shallow(<MovieDetails videos={videos} images={images} />);
    const event = {
      target: {
        pauseVideo: jest.fn(),
      },
    };

    wrapper.find('[data-test="MovieDetails.videoGalleryNav"]').simulate('imageClick', '57d2ffc49251415496000429');
    wrapper.find('[data-test="MovieDetails.videoGallery"]').simulate('videoReady', event);
    wrapper.find('[data-test="MovieDetails.imageGalleryNav"]').simulate('imageClick', 1);
    wrapper.find('[data-test="MovieDetails.galleryCloseButton"]').simulate('click');

    expect(event.target.pauseVideo).not.toHaveBeenCalled();
  });

  it('should remove video gallery if image gallery is opened', () => {
    const wrapper = shallow(<MovieDetails videos={videos} images={images} />);

    wrapper.find('[data-test="MovieDetails.videoGalleryNav"]').simulate('imageClick', '57d2ffc49251415496000429');
    expect(wrapper.find('[data-test="MovieDetails.videoGallery"]')).toHaveLength(1);

    wrapper.find('[data-test="MovieDetails.imageGalleryNav"]').simulate('imageClick', 3);
    expect(wrapper.find('[data-test="MovieDetails.videoGallery"]')).toHaveLength(0);
    expect(wrapper.find('[data-test="MovieDetails.imageGallery"]')).toHaveLength(1);
  });

  it('should remove image gallery if video gallery is opened', () => {
    const wrapper = shallow(<MovieDetails videos={videos} images={images} />);

    wrapper.find('[data-test="MovieDetails.imageGalleryNav"]').simulate('imageClick', 3);
    expect(wrapper.find('[data-test="MovieDetails.imageGallery"]')).toHaveLength(1);

    wrapper.find('[data-test="MovieDetails.videoGalleryNav"]').simulate('imageClick', '57d2ffc49251415496000429');
    expect(wrapper.find('[data-test="MovieDetails.imageGallery"]')).toHaveLength(0);
    expect(wrapper.find('[data-test="MovieDetails.videoGallery"]')).toHaveLength(1);
  });
});
