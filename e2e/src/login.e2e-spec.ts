import { LoginPage } from './login.po';
import { browser, logging, element, by } from 'protractor';

describe('workspace-project App', () => {
  let page: LoginPage;

  beforeEach(() => {
    page = new LoginPage();
  });

  it('should log in', () => {
    page.navigateTo();
    browser.driver.manage().window().setSize(1680, 1027);
    element(by.css('li>a')).click();

    element(by.css('form>div:nth-of-type(1)>input')).clear().then(() => {
      element(by.css('form>div:nth-of-type(1)>input')).sendKeys('decide');
    });

    element(by.css('form>div:nth-of-type(2)>input')).clear().then(() => {
      element(by.css('form>div:nth-of-type(2)>input')).sendKeys('decideegc');
    });
    element(by.css('form>button')).click();

    expect(element(by.css('app-header .navbar-nav')).getText()).toEqual('Votings');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
