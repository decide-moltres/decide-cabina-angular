import { browser, by, element } from 'protractor';

export class HeaderPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-header .navbar-brand')).getText() as Promise<string>;
  }

  getLoginText() {
    return element(by.css('app-header .nav-item')).getText() as Promise<string>;
  }
}
