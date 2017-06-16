import { AngularSwiftstartPage } from './app.po';

describe('angular-swiftstart App', () => {
  let page: AngularSwiftstartPage;

  beforeEach(() => {
    page = new AngularSwiftstartPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
