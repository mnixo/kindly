import SignupPage from '../support/page_objects/signupPage';
import LoginPage from '../support/page_objects/loginPage';
import HomePage from '../support/page_objects/homePage';
import ProfilePage from '../support/page_objects/profilePage';
import * as page from '../fixtures/URLs.json';

describe('Authorisation Spec', () => {
  it('User can sign up with valid username and password', () => {
    cy.visit(page.signup);
    SignupPage.usernameInput().type(Cypress.env('loginEmail'));
    SignupPage.emailInput().type(Cypress.env('loginEmail'));
    SignupPage.passwordInput().type(Cypress.env('loginPassword'));
    SignupPage.passwordConfirmationInput().type(Cypress.env('loginPassword'));
    SignupPage.agreeCheckbox().click();
    SignupPage.registerButton().click();
  });

  it('User can log in with valid username and password and log out', () => {
    cy.visit(page.login);
    LoginPage.emailInput().type(Cypress.env('loginEmail'));
    LoginPage.passwordInput().type(Cypress.env('loginPassword'));
    LoginPage.loginButton().click();
    cy.wait(1000);
    HomePage.profileIcon().should('be.visible').click();
    ProfilePage.logoutButton().click();
    cy.wait(1000);
    HomePage.profileIcon().should('not.exist');
  });
});
