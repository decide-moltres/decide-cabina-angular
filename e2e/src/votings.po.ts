import { browser, by, element } from 'protractor';

export class VotingsPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }
}
