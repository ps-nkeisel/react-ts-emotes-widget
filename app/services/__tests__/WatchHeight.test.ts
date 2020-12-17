// tslint:disable:no-string-literal
import WatchHeight from '../WatchHeight';

describe('WatchHeight', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    container.id = 'app';
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.innerHTML = ``;
  });

  it('init should get called when script gets imported with <div id="app" />', async () => {
    WatchHeight.init = jest.fn();
    // Import main index file that calls WatchHeight.
    require('index');
    // Assert that WatchHeight.init was called
    expect(WatchHeight.init).toHaveBeenCalled();
    expect(WatchHeight.init).toHaveBeenCalledWith(document.getElementById('app'));
  });

  it('postNewHeightMessage sends message via window.parent.postMessage', () => {
    window.parent.postMessage = jest.fn();
    WatchHeight['postNewHeightMessage'](300);
    expect(window.parent.postMessage).toHaveBeenCalled();
  });
});
