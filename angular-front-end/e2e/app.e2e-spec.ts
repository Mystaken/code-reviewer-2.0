import { NewProjectPage } from './app.po';

describe('new-project App', () => {
  let page: NewProjectPage;

  beforeEach(() => {
    page = new NewProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
