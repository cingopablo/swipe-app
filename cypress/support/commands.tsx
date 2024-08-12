/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

// @ts-expect-error. This is ok for this - should fix lint
import React from 'react'

import { Dialog } from '@/components'
import { SummaryType } from '@/lib/types.ts'

const lots: SummaryType[] = [
  {
    lot: {
      id: '0ef7ff09-b32e-43e6-ab58-95b6c0a39b4a',
      name: 'Lot Munich 26',
      image: 'https://images.freeimages.com/images/large-previews/e8e/underground-parking-1206464.jpg',
      address: 'Verdistrasse 26, 81257 München',
      live_date: '2020-11-03',
      status: 'active',
      size: 10,
      type: 'type',
    },
    vote: 'liked',
    createdAt: '2024-08-12T12:21:21.799Z',
  },
  {
    lot: {
      id: '19d9fb52-d0b3-43b0-8c38-1a4a8b9caa5b',
      name: 'Lot Munich 24',
      image: 'https://images.freeimages.com/images/large-previews/e8e/underground-parking-1206464.jpg',
      address: 'Verdistrasse 90, 81257 München',
      live_date: '2020-10-04',
      status: 'active',
      size: 20,
      type: 'type',
    },
    vote: 'disliked',
    createdAt: '2024-08-11T12:21:21.799Z',
  },
  {
    lot: {
      id: '2ba3887e-8db6-4173-8e48-d76cccfa8454',
      name: 'Lot Munich 36',
      image: 'https://images.freeimages.com/images/large-previews/e8e/underground-parking-1206464.jpg',
      address: 'Verdistrasse 146 81257 München',
      live_date: '2022-01-01',
      status: 'active',
      size: 30,
      type: 'type',
    },
    vote: 'liked',
    createdAt: '2024-08-10T12:21:21.799Z',
  },
  {
    lot: {
      id: '2ca2fbff-3c93-46c9-8e9a-c63cf79b1f9b',
      name: 'Lot Munich 27',
      image: 'https://images.freeimages.com/images/large-previews/47f/parking-space-1441053.jpg',
      address: 'Verdistrasse 27, 81257 München',
      live_date: '2020-11-14',
      status: 'active',
      size: 25,
      type: 'type',
    },
    vote: 'disliked',
    createdAt: '2024-08-09T12:21:21.799Z',
  },
  {
    lot: {
      id: '2e61aab7-094b-449b-a806-e34b40e92f26',
      name: 'Lot Munich 4',
      image: 'https://images.freeimages.com/images/large-previews/e8e/underground-parking-1206464.jpg',
      address: 'Verdistrasse 32, 81257 München',
      live_date: '2020-01-01',
      status: 'active',
      size: 19,
      type: 'type',
    },
    vote: 'liked',
    createdAt: '2024-08-08T12:21:21.799Z',
  },
]

Cypress.Commands.add('data', value => {
  return cy.get(`[data-cy="${value}"]`)
})

Cypress.Commands.add('openDialog', () => {
  cy.mount(<Dialog title={'Summary view'} lots={lots} />)

  cy.wait(500)

  cy.data('show-summary-view').click()
})

Cypress.Commands.add('openEmptyDialog', () => {
  cy.mount(<Dialog title={'Summary view'} lots={[]} />)

  cy.wait(500)

  cy.data('show-summary-view').click()
})
