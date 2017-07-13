import { PaperlessPage } from './app.po';

describe('paperless App', () => {
  let page: PaperlessPage;

  beforeEach(() => {
    page = new PaperlessPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
