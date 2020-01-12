import { HeaderPage } from './header.po';
import { browser, logging } from 'protractor';

describe('Header module', () => {
  let page: HeaderPage;

  beforeEach(() => {
    page = new HeaderPage();
  });

  it('should display title message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Decide Moltres Cabina');
  });

  it('should display login if not logged in', () => {
    page.navigateTo();
    expect(page.getLoginText()).toEqual('Login');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});


