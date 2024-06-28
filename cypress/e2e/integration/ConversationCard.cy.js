/// <reference types="cypress" />

describe('ConversationCard', () => {
  it('Should close the ellipsis menu after the play function run', () => {
    cy.visit(
      '/iframe.html?id=messaging-conversationcard--conversation-card-with-unread-message'
    );
    // wait for play function to end (these shouldn't run during tests btw)
    cy.wait(1000);
    cy.get('h2.font-bold').should('have.text', 'Jane Doe');
    cy.get('button.text-sm').first().should('be.visible');
    cy.get('button.rounded-md').should('be.visible').click();
    cy.get('button.text-sm').should('not.exist');
  });
});
