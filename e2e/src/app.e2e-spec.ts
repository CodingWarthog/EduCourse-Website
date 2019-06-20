import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';
import { UserService } from 'src/app/_services/user.service';

describe('workspace-project App', () => {
  let page: AppPage;

  const credentials = {
    username: 'testowanie',
    password: 'testowanie'
  };
  const incorrect_credentials = {
    username: 'testowanie22222',
    password: 'testowanie22222'
  };

  beforeEach(() => {
    page = new AppPage();
  });



  // test integracyjny
  it('should display a login button', () => {
    page.navigateTo();
    expect(page.getLoginButton().getText()).toEqual('person Logowanie');
  });

  // 2 test integracyjny
  it('should go to login page', () => {
    page.navigateTo();
    page.getLoginButton().click();
    expect(page.getloginPageIconText().getText()).toEqual('person');
  });
  // 3 test integracyjny
  it('should login user', () => {
    page.navigateTo();
    page.getLoginButton().click();
    expect(page.getloginPageIconText().getText()).toEqual('person');
    page.fillCredentials();
    page.getSubmitButton().click();
    expect(page.getLoginButton2().getText()).toEqual('person Wyloguj');
  });

   // 1 test e2e

});
