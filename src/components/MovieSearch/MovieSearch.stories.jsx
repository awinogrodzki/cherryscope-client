import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import MovieSearch from './MovieSearch';
import { mockGenres } from './data/mocks';

storiesOf('MovieSearch', module)
  .addDecorator(story => (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#eee' }}>
      {story()}
    </div>
  ))
  .add('Default', () => (
    <MovieSearch />
  ))
  .add('Expanded', () => (
    <MovieSearch isExpanded />
  ))
  .add('With genres', () => (
    <MovieSearch isExpanded genres={mockGenres} />
  ));
