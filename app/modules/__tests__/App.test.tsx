import { shallow } from 'enzyme';
import * as React from 'react';
import App from '../App';

describe('App wrapper component', () => {
  it('should render correctly', () => {
    expect(shallow(<App />)).toMatchSnapshot();
  });
});
