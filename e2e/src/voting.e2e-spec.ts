import { VotingPage } from './voting.po';
import { browser, logging, element, by } from 'protractor';

describe('Voting module', () => {
  let page: VotingPage;

  beforeEach(() => {
    page = new VotingPage();
  });

  it(`being logged in, go to votings, show atleast one voting option, then go to the first voting,
  and show atleast one option and the button`, () => {
    page.navigateTo();
    browser.driver.manage().window().setSize(1680, 1027);

    element(by.css('nav>div>ul:nth-of-type(1)>li>a')).click();

    element(by.css('app-voting-item:nth-of-type(1)>ul>li>a>div:nth-of-type(1)')).click();
    expect(element(by.css('app-voting .form-check-input')).isPresent()).toBeTruthy();
    element(by.css('form>div:nth-of-type(1)>div>label>span:nth-of-type(2)')).click();
    expect(element(by.buttonText('Vote')));

  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
