describe('<Dialog />', () => {
  it('Open dialog without results', () => {
    cy.openEmptyDialog()

    // See that it displays the empty state
    cy.data('empty-page')
  })

  it('Open Dialog and check default settings', () => {
    cy.openDialog()

    // Check section title
    const groupTitleAll = cy.data('group-title-all')
    groupTitleAll.should('have.text', 'all (5)')

    // Check items in list
    cy.data('list').children().should('have.length', 5)
  })

  it('Check sort DESC - Newest First', () => {
    cy.openDialog()

    // Check initial state of sorting button - It should have a background
    const sortDesc = cy.data('sort-desc')
    sortDesc.should('have.class', 'bg-indigo-100')

    // Check that the first item on the list is the newest
    cy.data('list-item-date').first().should('have.text', 'Aug 12, 2024, 2:21:21 PM')
  })

  it('Check sort ASC - Oldest First', () => {
    cy.openDialog()

    // Check click and state of sorting button - It should have a background once it's selected
    const sortAsc = cy.data('sort-asc')
    sortAsc.click()
    sortAsc.should('have.class', 'bg-indigo-100')

    // Check that the first item on the list is the oldest
    cy.data('list-item-date').first().should('have.text', 'Aug 8, 2024, 2:21:21 PM')
  })

  it('Check grouping', () => {
    cy.openDialog()

    // Check click and state of group button - It should have a background once it's selected
    const group = cy.data('group')
    group.click()
    group.should('have.class', 'bg-indigo-100')

    // Check section title for liked
    const groupTitleLiked = cy.data('group-title-liked')
    groupTitleLiked.should('have.text', 'liked (3)')

    // Check section title for disliked
    const groupTitleDisliked = cy.data('group-title-disliked')
    groupTitleDisliked.should('have.text', 'disliked (2)')

    // Check that the first item on the list is the newest from the Liked section
    cy.data('list-item-date').first().should('have.text', 'Aug 12, 2024, 2:21:21 PM')

    // Change the sorting to display the oldest first
    const sortAsc = cy.data('sort-asc').click()
    sortAsc.should('have.class', 'bg-indigo-100')

    // Check that the first item on the list is the oldest from the Liked section
    cy.data('list-item-date').first().should('have.text', 'Aug 8, 2024, 2:21:21 PM')
  })

  it('Check search by name', () => {
    cy.openDialog()

    // Check initial number of items
    cy.data('list').children().should('have.length', 5)

    // Check that the search field has a determined border once clicked
    const searchBox = cy.data('search-box')
    searchBox.click()
    searchBox.should('have.class', 'focus-visible:border-indigo-200')

    // Type something random on the search box
    searchBox.type('there should be nothing in the list')

    // See that it displays the empty state
    cy.data('empty-page')

    // Clear input
    searchBox.clear()

    // Type new value and check that there are 3 results
    searchBox.type('2')
    cy.data('list').children().should('have.length', 3)
  })
})
