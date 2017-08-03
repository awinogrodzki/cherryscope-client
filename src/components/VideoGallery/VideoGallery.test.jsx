import React from 'react';
import { shallow } from 'enzyme';
import VideoGallery from './VideoGallery';

const videos = [
  {
    id: '57d2ffc49251415496000429',
    key: 'PC460OxDNhc',
    name: 'Announcement',
    site: 'YouTube',
  },
  {
    id: '590dedfbc3a36864a700fb24',
    key: 'T7O7BtBnsG4',
    name: 'Official Trailer #1',
    site: 'YouTube',
  },
  {
    id: 'vimeo_id',
    key: 'vimeo_key',
    name: 'Official Trailer #1',
    site: 'Vimeo',
  },
];


describe('VideoGallery', () => {
  it('should render video only if id is selected', () => {
    const wrapper = shallow(
      <VideoGallery videos={videos} selectedVideoId={'57d2ffc49251415496000429'} />
    );
    const wrapperWithoutSelectedId = shallow(<VideoGallery videos={videos} />);

    expect(wrapper.find('[data-test="VideoGallery.video"]')).toHaveLength(1);
    expect(wrapperWithoutSelectedId.find('[data-test="VideoGallery.video"]')).toHaveLength(0);
  });

  it('should render only youtube videos', () => {
    const youtubeWrapper = shallow(
      <VideoGallery videos={videos} selectedVideoId={'57d2ffc49251415496000429'} />
    );
    const vimeoWrapper = shallow(<VideoGallery videos={videos} selectedVideoId={'vimeo_id'} />);

    expect(youtubeWrapper.find('[data-test="VideoGallery.video"]')).toHaveLength(1);
    expect(vimeoWrapper.find('[data-test="VideoGallery.video"]')).toHaveLength(0);
  });
});
