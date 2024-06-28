import BasePage from './basePage';

export class SignupPage extends BasePage {
  registerButton() {
    return cy.get('button').contains('REGISTER').should('be.visible');
  }

  usernameInput() {
    return cy.get('input[name="user_name"]').should('be.visible');
  }

  emailInput() {
    return cy.get('input[name="email"]').should('be.visible');
  }

  passwordInput() {
    return cy.get('input#password').should('be.visible');
  }

  passwordConfirmationInput() {
    return cy.get('input#confirmPassword').should('be.visible');
  }

  agreeCheckbox() {
    return cy.get('input#agreeCheckbox').should('be.visible');
  }
}

export default new SignupPage();
