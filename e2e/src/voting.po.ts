import { browser, by, element } from 'protractor';

export class VotingPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }
}
