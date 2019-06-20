import { browser, by, element } from 'protractor';

export class AppPage {
  private credentials = {
    username: 'pumba',
    password: 'pumba'
  };

  navigateTo() {
    return browser.get('/');
  }
  navigateToResult() {
    return browser.get('/users');
  }

  getTitleText() {
    return element(by.css('app-home h1')).getText();
  }
  getLoginButton() {
    return element(by.id('login'));
  }
  getLoginButton2() {
    return element(by.id('login2'));
  }
  getloginPageIconText() {
    return element(by.tagName('app-login mat-icon'));
  }
  fillCredentials(credentials: any = this.credentials) {
    element(by.css('[name="username"]')).sendKeys(credentials.username);
    element(by.css('[name="password"]')).sendKeys(credentials.password);
  }
  getSubmitButton() {
    return element(by.id('zaloguj'));
  }
}
