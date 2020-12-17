import { mount } from 'enzyme';
import 'jest';
import React from 'react';
import Header from '../Header';

describe('Sample test', () => {
  test('Header mounts', () => {
    expect(mount(<Header isVoted={false} votes={12} hideBranding={false} />)).toMatchSnapshot();
  });
});
