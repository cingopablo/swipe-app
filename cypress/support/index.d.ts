declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.data('button')
     */
    data(value: string): Chainable<JQuery<HTMLElement>>
    openDialog(): Chainable<JQuery<HTMLElement>>
    openEmptyDialog(): Chainable<JQuery<HTMLElement>>
  }
}
