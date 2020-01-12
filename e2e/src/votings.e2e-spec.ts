import { VotingsPage } from './votings.po';
import { browser, logging, element, by } from 'protractor';

describe('Votings module', () => {
  let page: VotingsPage;

  beforeEach(() => {
    page = new VotingsPage();
  });

  it('being logged in, go to votings and show atleast one voting option', () => {
    page.navigateTo();
    browser.driver.manage().window().setSize(1680, 1027);

    element(by.css('nav>div>ul:nth-of-type(1)>li>a')).click();

    expect(element(by.css('app-votings .side-title')).getText()).toEqual('Votings');
    expect(element(by.css('app-voting-item .element')).isPresent()).toBeTruthy();

  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
