import { MaePage } from './app.po';

describe('mae App', () => {
  let page: MaePage;

  beforeEach(() => {
    page = new MaePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
