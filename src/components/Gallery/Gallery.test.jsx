import React from 'react';
import { shallow } from 'enzyme';
import Gallery from './Gallery';
import GalleryView from './GalleryView';
import GalleryNav from './GalleryNav';

describe('Gallery', () => {
  const images = [
    { id: 1, url: 'image_1_url' },
    { id: 2, url: 'image_2_url' },
    { id: 3, url: 'image_3_url' },
  ];

  const thumbnails = [
    { id: 1, url: 'thumbnail_1_url' },
    { id: 2, url: 'thumbnail_2_url' },
    { id: 3, url: 'thumbnail_3_url' },
  ];

  it('should display gallery navigation with provided thumbnail images', () => {
    const wrapper = shallow(<Gallery thumbnails={thumbnails} />);
    const galleryNavWrapper = wrapper.find(GalleryNav);
    const galleryNavImages = galleryNavWrapper.props().images;

    expect(galleryNavWrapper).toHaveLength(1);
    expect(galleryNavImages).toHaveLength(3);
    expect(galleryNavImages[0].url).toBe('thumbnail_1_url');
    expect(galleryNavImages[1].url).toBe('thumbnail_2_url');
    expect(galleryNavImages[2].url).toBe('thumbnail_3_url');
  });

  it('should not display gallery nav if thumbnails are not provided', () => {
    const wrapper = shallow(<Gallery />);

    expect(wrapper.find(GalleryNav)).toHaveLength(0);
  });

  it('should display gallery view with provided images', () => {
    const wrapper = shallow(<Gallery images={images} />);
    const galleryViewWrapper = wrapper.find(GalleryView);
    const galleryViewImages = galleryViewWrapper.props().images;

    expect(galleryViewWrapper).toHaveLength(1);
    expect(galleryViewImages).toHaveLength(3);
    expect(galleryViewImages[0].url).toBe('image_1_url');
    expect(galleryViewImages[1].url).toBe('image_2_url');
    expect(galleryViewImages[2].url).toBe('image_3_url');
  });

  it('should pass selected image id to nav and view components', () => {
    const wrapper = shallow(<Gallery thumbnails={thumbnails} selectedImageId={2} />);

    expect(wrapper.find(GalleryView).props().selectedImageId).toBe(2);
    expect(wrapper.find(GalleryNav).props().selectedImageId).toBe(2);
  });

  it('should inform about image click', () => {
    const onImageClickSpy = jest.fn();
    const wrapper = shallow(<Gallery thumbnails={thumbnails} onImageClick={onImageClickSpy} />);
    const galleryNavWrapper = wrapper.find(GalleryNav);

    galleryNavWrapper.simulate('imageClick', 2);
    expect(onImageClickSpy).toHaveBeenCalledWith(2);
  });
});
