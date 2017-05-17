import { H5OooseedPage } from './app.po';

describe('h5-oooseed App', () => {
  let page: H5OooseedPage;

  beforeEach(() => {
    page = new H5OooseedPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
